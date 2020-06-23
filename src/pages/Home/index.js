/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Appbar from "../../components/Appbar";
import ModalInline from "../../components/ModalInline";
import Calendar from "./Calendar";
import AsideCeremony from "./AsideCeremony";
import AsideNote from "./AsideNote";
import ModalNote from "./ModalNote";
import ModalCeremony from "./ModalCeremony";
import { Context, ContextProvider } from "./state";
import { createUseStyles } from "react-jss";
import { CSSTransition } from "react-transition-group";
import { breakpoints } from "../../utils/theme";
import { DISPATCH_SET_VALUE } from "../../utils/constants";
import { renderClassName } from "../../utils/helpers";

const useStyles = createUseStyles({
  root: {
    overflow: "hidden",
  },
  content: {
    display: "flex",
    [breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
    },
  },
  aside: {
    [breakpoints.up("md")]: {
      width: 275,
      height: window.innerHeight - 64,
      borderRight: "1px solid #dadce0",
      overflowY: "auto",
    },
    [breakpoints.down("sm")]: {
      width: "100%",
    },
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
        }) => (
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
              <div className={classes.aside}>
                <AsideNote calendar={state.calendar} dispatch={dispatch} />
                <AsideCeremony calendar={state.calendar} dispatch={dispatch} />
              </div>
              <div
                className={renderClassName(
                  classes.calendarRoot,
                  state.inlineModal.target && classes.calendarShift
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
              target={state.inlineModal.target}
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
        )}
      </Context.Consumer>
    </ContextProvider>
  );
};

export default Home;
