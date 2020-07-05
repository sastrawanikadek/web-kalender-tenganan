import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Text from "../Text";
import Tooltip from "../Tooltip";
import IconButton from "../IconButton";
import Button from "../Button";
import Datepicker from "../Datepicker";
import Modal from "../Modal";
import TextInput from "../TextInput";
import ChevronLeftIcon from "mdi-react/ChevronLeftIcon";
import ChevronRightIcon from "mdi-react/ChevronRightIcon";
import { createUseStyles } from "react-jss";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { color, breakpoints } from "../../utils/theme";

const useStyles = createUseStyles({
  root: {
    height: 64,
    padding: 12,
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #dadce0",
    boxSizing: "border-box",
  },
  title: {
    [breakpoints.up("sm")]: {
      marginRight: 32,
    },
  },
  iconButton: {
    padding: 4,
  },
  button: {
    padding: "8px 12px",
  },
  buttonText: {
    textTransform: "none",
  },
  expand: {
    flex: 1,
  },
  modalBody: {
    display: "block",
    marginTop: 0,
  },
  modalFooter: {
    justifyContent: "center",
    padding: "16px 24px",
  },
  modalSubmitButton: {
    marginTop: 24,
    marginLeft: "auto",
  },
  modalHelperButton: {
    padding: 6,
    marginLeft: 4,
    color: color.primary,
  },
});

const AppbarView = (props) => {
  const {
    state,
    date,
    onSetDate,
    onPrevMonth,
    onNextMonth,
    onLogin,
    onRegister,
    onLogout,
  } = props;
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.root}>
        <Text variant="h6" className={classes.title} noMargin>
          Kalender Tenganan
        </Text>
        <Tooltip content="Bulan Lalu">
          <IconButton className={classes.iconButton} onClick={onPrevMonth}>
            <ChevronLeftIcon />
          </IconButton>
        </Tooltip>
        <Tooltip content="Bulan Depan">
          <IconButton className={classes.iconButton} onClick={onNextMonth}>
            <ChevronRightIcon />
          </IconButton>
        </Tooltip>
        <Button
          className={classes.button}
          onClick={() => setShowDatepicker(true)}
        >
          <Text variant="h6" className={classes.buttonText} noMargin>
            {format(date, "MMMM yyyy", { locale: id })}
          </Text>
        </Button>
        <div className={classes.expand} />
        <Button
          className={classes.button}
          onClick={state.loggedIn ? onLogout : () => setShowModal(true)}
        >
          <Text variant="h6" className={classes.buttonText} noMargin>
            {state.loggedIn ? "Keluar" : "Masuk"}
          </Text>
        </Button>
      </div>
      <Datepicker
        show={showDatepicker}
        value={date}
        onChange={onSetDate}
        onClose={() => setShowDatepicker(false)}
        modes={["year", "month"]}
      />
      <Modal
        header={
          <div>
            <Text variant="h6">
              {modalMode === "login" ? "Masuk" : "Daftar"}
            </Text>
            <Text variant="paragraph" noMargin>
              {modalMode === "login"
                ? "Silahkan masuk terlebih dahulu untuk dapat mengelola catatan Anda"
                : "Silahkan daftar akun terlebih dahulu untuk mulai mengelola catatan Anda"}
            </Text>
          </div>
        }
        footer={
          <Fragment>
            <Text variant="caption" noMargin>
              {modalMode === "login"
                ? "Belum punya akun?"
                : "Sudah punya akun?"}
            </Text>
            <Button
              className={classes.modalHelperButton}
              onClick={() =>
                setModalMode(modalMode === "login" ? "register" : "login")
              }
            >
              <Text variant="caption" noMargin>
                {modalMode === "login" ? "Daftar disini" : "Masuk disini"}
              </Text>
            </Button>
          </Fragment>
        }
        classNameOptions={{
          body: classes.modalBody,
          footer: classes.modalFooter,
        }}
        show={!state.loggedIn && showModal}
        onClose={state.process ? null : () => setShowModal(false)}
      >
        <form
          onSubmit={
            state.process
              ? (e) => e.preventDefault()
              : (e) =>
                  modalMode === "login"
                    ? onLogin(e, email, password)
                    : onRegister(e, name, email, password)
          }
        >
          {modalMode === "register" && (
            <TextInput
              variant="outlined"
              label="Nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
          )}
          <TextInput
            variant="outlined"
            label="Alamat Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
          <TextInput
            variant="outlined"
            label="Kata Sandi"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="outlined"
            className={classes.modalSubmitButton}
            onClick={(e) =>
              modalMode === "login"
                ? onLogin(e, email, password)
                : onRegister(e, name, email, password)
            }
            disable={state.process}
          >
            Kirim
          </Button>
        </form>
      </Modal>
    </Fragment>
  );
};

AppbarView.propTypes = {
  state: PropTypes.any,
  date: PropTypes.instanceOf(Date),
  onSetDate: PropTypes.func,
  onPrevMonth: PropTypes.func,
  onNextMonth: PropTypes.func,
  onLogin: PropTypes.func,
  onRegister: PropTypes.func,
  onLogout: PropTypes.func,
};

export default AppbarView;
