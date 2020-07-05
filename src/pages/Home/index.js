/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Appbar from "../../components/Appbar";
import ModalInline from "../../components/ModalInline";
import Calendar from "./Calendar";
import AsideCeremony from "./AsideCeremony";
import AsideNote from "./AsideNote";
import ModalNote from "./ModalNote";
import ModalCeremony from "./ModalCeremony";
import Text from "../../components/Text";
import { Context, ContextProvider } from "./state";
import { createUseStyles } from "react-jss";
import { CSSTransition } from "react-transition-group";
import { breakpoints, color } from "../../utils/theme";
import { DISPATCH_SET_VALUE } from "../../utils/constants";
import { renderClassName, useMedia } from "../../utils/helpers";

const useStyles = createUseStyles({
  mobileRoot: {
    height: "100vh",
    maxWidth: 678,
    padding: 24,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  },
  mobileImg: {
    maxWidth: "100%",
    height: "auto",
    marginBottom: 24,
  },
  mobileButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    padding: "12px 24px",
    cursor: "pointer",
    overflow: "hidden",
    outline: "none",
    marginTop: 16,
    color: color.primary,
    backgroundColor: "transparent",
    border: "1px solid currentColor",
    borderRadius: 4,
    "-webkit-tap-highlight-color": "transparent",
    "&:focus div:after": {
      backgroundColor: "currentColor",
    },
  },
  root: {
    overflow: "hidden",
  },
  content: {
    display: "flex",
    [breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  aside: {
    width: 275,
    height: window.innerHeight - 64,
    borderRight: "1px solid #dadce0",
    overflowY: "auto",
  },
  calendarRoot: {
    flex: 1,
    overflow: "hidden",
    transition: "margin-left 0.3s ease-in-out",
  },
  calendarShift: {
    marginLeft: 401,
  },
  calendarExit: {
    transform: "translateX(0)",
  },
  leftSlideExit: {
    transform: "translateX(200%)",
    transition: "transform 0.2s ease",
    willChange: "transform",
  },
  rightSlideExit: {
    transform: "translateX(-200%)",
    transition: "transform 0.2s ease",
    willChange: "transform",
  },
  leftSlideEnter: {
    transform: "translateX(-100%)",
  },
  rightSlideEnter: {
    transform: "translateX(100%)",
  },
  calendarEnter: {
    transform: "translateX(0)",
    transition: "transform 0.2s ease",
    willChange: "transform",
  },
});

const Home = () => {
  const classes = useStyles();
  const isMobile = useMedia(breakpoints.down("sm"));

  return (
    <ContextProvider>
      <Context.Consumer>
        {({
          state,
          dispatch,
          handlePrevMonth,
          handleNextMonth,
          handleSetDate,
          handleLogin,
          handleRegister,
          handleLogout,
          handleClickCalendar,
          handleClickNote,
        }) =>
          isMobile ? (
            <div className={classes.mobileRoot}>
              <img
                src="/mobile.svg"
                alt="Mobile Illustration"
                className={classes.mobileImg}
              />
              <Text variant="paragraph" align="center">
                Demi pengalaman penggunaan yang lebih baik, Anda dapat mengunduh
                aplikasi Android kami dengan menekan tombol di bawah ini.
              </Text>
              <a
                href="https://drive.google.com/drive/folders/1TAft8pu_MyL3dq4ppYjDjiMAon0CjNz2?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.mobileButton}
              >
                <Text variant="button" noMargin>
                  Unduh Disini
                </Text>
              </a>
            </div>
          ) : (
            <div className={classes.root}>
              <Appbar
                state={state}
                date={state.date}
                onSetDate={handleSetDate}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
                onLogin={handleLogin}
                onRegister={handleRegister}
                onLogout={handleLogout}
              />
              <div className={classes.content}>
                {!isMobile && (
                  <div className={classes.aside}>
                    <AsideNote calendar={state.calendar} dispatch={dispatch} />
                    <AsideCeremony
                      calendar={state.calendar}
                      dispatch={dispatch}
                    />
                  </div>
                )}
                <div
                  className={renderClassName(
                    classes.calendarRoot,
                    !isMobile &&
                      state.inlineModal.target &&
                      classes.calendarShift
                  )}
                >
                  <CSSTransition
                    in={state.move}
                    timeout={200}
                    classNames={{
                      enter: classes[`${state.slide}SlideEnter`],
                      enterActive: classes.calendarEnter,
                      exit: classes.calendarExit,
                      exitActive: classes[`${state.slide}SlideExit`],
                    }}
                    onExited={() =>
                      dispatch({
                        type: DISPATCH_SET_VALUE,
                        name: "move",
                        value: true,
                      })
                    }
                    unmountOnExit
                  >
                    <Calendar
                      calendar={state.calendar}
                      date={state.date}
                      onClick={handleClickCalendar}
                      isLoggedIn={state.loggedIn}
                    />
                  </CSSTransition>
                </div>
              </div>
              <ModalInline
                target={isMobile ? null : state.inlineModal.target}
                onClose={() =>
                  dispatch({
                    type: DISPATCH_SET_VALUE,
                    name: "inlineModal",
                    value: { target: null, data: null, mode: "" },
                  })
                }
              >
                {state.inlineModal.mode === "note" ? (
                  <ModalNote
                    date={state.date}
                    data={state.inlineModal.data}
                    onClick={handleClickNote}
                  />
                ) : (
                  <ModalCeremony
                    date={state.date}
                    data={state.inlineModal.data}
                  />
                )}
              </ModalInline>
            </div>
          )
        }
      </Context.Consumer>
    </ContextProvider>
  );
};

export default Home;
