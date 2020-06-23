/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer, createContext } from "react";
import Toast from "../../components/Toast";
import Modal from "../../components/Modal";
import Text from "../../components/Text";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import {
  TODAY,
  DISPATCH_SET_VALUE,
  DISPATCH_SET_BULK_VALUE,
  BASE_URL,
  SECRET_KEY,
  DISPATCH_SET_TOAST,
  DISPATCH_SET_CLOSE_TOAST,
} from "../../utils/constants";
import AES from "crypto-js/aes";
import utf8 from "crypto-js/enc-utf8";
import {
  subMonths,
  addMonths,
  differenceInCalendarMonths,
  format,
} from "date-fns";
import { createUseStyles } from "react-jss";
import { validateEmail } from "../../utils/helpers";
import { id } from "date-fns/locale";

const useStyles = createUseStyles({
  modalBody: {
    display: "block",
    margin: 0,
  },
  modalSubmitButton: {
    marginTop: 24,
    marginLeft: "auto",
  },
});

const initialState = {
  date: TODAY,
  slide: "left",
  move: true,
  process: false,
  loggedIn: false,
  form: {
    id_catatan: "",
    id_sasih: "",
    tgl_masehi: TODAY,
    tgl_sasih: "",
    saka: "",
    jenis_tgl_sasih: "",
    judul: "",
    catatan: "",
  },
  modal: {
    show: false,
    mode: "",
  },
  inlineModal: {
    target: null,
    data: null,
    mode: "",
  },
  toast: {
    show: false,
    variant: "normal",
    message: "",
  },
  calendar: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case DISPATCH_SET_VALUE:
      return { ...state, [action.name]: action.value };
    case DISPATCH_SET_BULK_VALUE:
      return { ...state, ...action.value };
    case DISPATCH_SET_TOAST:
      return {
        ...state,
        toast: { show: true, variant: action.variant, message: action.message },
      };
    case DISPATCH_SET_CLOSE_TOAST:
      return { ...state, toast: { ...state.toast, show: false } };
    default:
      console.error("Invalid Action");
  }
};

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const classes = useStyles();

  const handlePrevMonth = () => {
    dispatch({
      type: DISPATCH_SET_BULK_VALUE,
      value: {
        date: subMonths(state.date, 1),
        slide: "left",
        move: false,
      },
    });
  };

  const handleNextMonth = () => {
    dispatch({
      type: DISPATCH_SET_BULK_VALUE,
      value: {
        date: addMonths(state.date, 1),
        slide: "right",
        move: false,
      },
    });
  };

  const handleSetDate = (value) => {
    if (differenceInCalendarMonths(value, state.date) !== 0) {
      const slide =
        differenceInCalendarMonths(value, state.date) > 0 ? "right" : "left";

      dispatch({
        type: DISPATCH_SET_BULK_VALUE,
        value: {
          date: value,
          slide,
          move: false,
        },
      });
    }
  };

  const handleGetCalendar = async () => {
    const id_user = localStorage.getItem("id")
      ? AES.decrypt(localStorage.getItem("id"), SECRET_KEY).toString(utf8)
      : "";

    const request = await fetch(
      `${BASE_URL}/get_calendar.php?bulan=${
        state.date.getMonth() + 1
      }&tahun=${state.date.getFullYear()}&id_pengguna=${id_user}`
    );
    try {
      const result = await request.json();
      dispatch({
        type: DISPATCH_SET_VALUE,
        name: "calendar",
        value: result.data,
      });
    } catch (e) {
      console.log("Gagal memperoleh data, sedang mencoba kembali...");
      handleGetCalendar();
    }
  };

  const handleLogin = async (e, email, password) => {
    e.preventDefault();
    dispatch({
      type: DISPATCH_SET_TOAST,
      variant: "normal",
      message: "Mohon tunggu, proses sedang berlangsung",
    });
    dispatch({
      type: DISPATCH_SET_VALUE,
      name: "process",
      value: true,
    });

    if (validateEmail(email) && password) {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const request = await fetch(`${BASE_URL}/login.php`, {
        method: "POST",
        body: formData,
      });

      try {
        const result = await request.json();

        if (result.status === 200) {
          localStorage.setItem(
            "id",
            AES.encrypt(`${result.data.id}`, SECRET_KEY).toString()
          );
          await handleGetCalendar();

          dispatch({
            type: DISPATCH_SET_VALUE,
            name: "loggedIn",
            value: true,
          });
          dispatch({
            type: DISPATCH_SET_TOAST,
            variant: "success",
            message: result.message,
          });
        } else {
          dispatch({
            type: DISPATCH_SET_TOAST,
            variant: "warning",
            message: result.message,
          });
        }
      } catch (err) {
        console.log(err);
        dispatch({
          type: DISPATCH_SET_TOAST,
          variant: "error",
          message: "Proses gagal, silahkan coba kembali...",
        });
      }

      dispatch({
        type: DISPATCH_SET_VALUE,
        name: "process",
        value: false,
      });
      return;
    }

    dispatch({
      type: DISPATCH_SET_VALUE,
      name: "process",
      value: false,
    });

    dispatch({
      type: DISPATCH_SET_TOAST,
      variant: "warning",
      message: "Mohon isikan semua kolom",
    });
    return;
  };

  const handleRegister = async (e, name, email, password) => {
    e.preventDefault();
    dispatch({
      type: DISPATCH_SET_TOAST,
      variant: "normal",
      message: "Mohon tunggu, proses sedang berlangsung",
    });
    dispatch({
      type: DISPATCH_SET_VALUE,
      name: "process",
      value: true,
    });

    if (name && validateEmail(email) && password) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);

      const request = await fetch(`${BASE_URL}/register.php`, {
        method: "POST",
        body: formData,
      });

      try {
        const result = await request.json();

        if (result.status === 200) {
          localStorage.setItem(
            "id",
            AES.encrypt(`${result.data.id}`, SECRET_KEY).toString()
          );
          await handleGetCalendar();

          dispatch({
            type: DISPATCH_SET_VALUE,
            name: "loggedIn",
            value: true,
          });
          dispatch({
            type: DISPATCH_SET_TOAST,
            variant: "success",
            message: result.message,
          });
        } else {
          dispatch({
            type: DISPATCH_SET_TOAST,
            variant: result.status === 400 ? "warning" : "error",
            message: result.message,
          });
        }
      } catch (err) {
        dispatch({
          type: DISPATCH_SET_TOAST,
          variant: "error",
          message: "Gagal melakukan pendaftaran, silahkan coba kembali...",
        });
      }

      dispatch({
        type: DISPATCH_SET_VALUE,
        name: "process",
        value: false,
      });
      return;
    }

    dispatch({
      type: DISPATCH_SET_VALUE,
      name: "process",
      value: false,
    });

    dispatch({
      type: DISPATCH_SET_TOAST,
      variant: "warning",
      message: "Mohon isikan semua kolom",
    });
    return;
  };

  const handleLogout = () => {
    localStorage.removeItem("id");
    dispatch({
      type: DISPATCH_SET_VALUE,
      name: "loggedIn",
      value: false,
    });
  };

  const handleClickCalendar = (data) => {
    const { id_sasih, tgl_masehi, tgl_sasih, saka, jenis_tgl_sasih } = data;

    dispatch({
      type: DISPATCH_SET_VALUE,
      name: "form",
      value: {
        id_sasih,
        tgl_masehi: `${format(new Date(state.date), "yyyy-MM-")}${
          tgl_masehi < 10 ? `0${tgl_masehi}` : tgl_masehi
        }`,
        tgl_sasih,
        saka,
        jenis_tgl_sasih,
        judul: "",
        catatan: "",
      },
    });
    dispatch({
      type: DISPATCH_SET_VALUE,
      name: "modal",
      value: {
        show: true,
        mode: "add",
      },
    });
  };

  const handleClickNote = (data) => {
    const {
      id_catatan,
      id_sasih,
      tgl_masehi,
      tgl_sasih,
      saka,
      jenis_tgl_sasih,
      judul,
      catatan,
    } = data;
    dispatch({
      type: DISPATCH_SET_VALUE,
      name: "form",
      value: {
        id_catatan,
        id_sasih,
        tgl_masehi: `${format(new Date(state.date), "yyyy-MM-")}${
          tgl_masehi < 10 ? `0${tgl_masehi}` : tgl_masehi
        }`,
        tgl_sasih,
        saka,
        jenis_tgl_sasih,
        judul,
        catatan,
      },
    });
    dispatch({
      type: DISPATCH_SET_VALUE,
      name: "modal",
      value: {
        show: true,
        mode: "update",
      },
    });
  };

  const handleAddNote = async (e) => {
    const id_user = AES.decrypt(
      localStorage.getItem("id"),
      SECRET_KEY
    ).toString(utf8);
    const {
      id_sasih,
      tgl_masehi,
      tgl_sasih,
      saka,
      jenis_tgl_sasih,
      judul,
      catatan,
    } = state.form;

    e.preventDefault();
    dispatch({
      type: DISPATCH_SET_TOAST,
      variant: "normal",
      message: "Mohon tunggu, proses sedang berlangsung",
    });
    dispatch({
      type: DISPATCH_SET_VALUE,
      name: "process",
      value: true,
    });

    if (catatan) {
      const formData = new FormData();
      formData.append("id_user", id_user);
      formData.append("id_sasih", id_sasih);
      formData.append("tgl_masehi", tgl_masehi);
      formData.append("tgl_sasih", tgl_sasih);
      formData.append("saka", saka);
      formData.append("jenis_tgl_sasih", jenis_tgl_sasih);
      formData.append("judul", judul);
      formData.append("catatan", catatan);

      const request = await fetch(`${BASE_URL}/add_note.php`, {
        method: "POST",
        body: formData,
      });

      try {
        const result = await request.json();

        if (result.status === 200) {
          dispatch({
            type: DISPATCH_SET_TOAST,
            variant: "success",
            message: result.message,
          });

          await handleGetCalendar();
        } else {
          dispatch({
            type: DISPATCH_SET_TOAST,
            variant: result.status === 400 ? "warning" : "error",
            message: result.message,
          });
        }
      } catch (err) {
        dispatch({
          type: DISPATCH_SET_TOAST,
          variant: "error",
          message: "Proses gagal, silahkan coba kembali...",
        });
      }

      dispatch({
        type: DISPATCH_SET_VALUE,
        name: "process",
        value: false,
      });
      return;
    }

    dispatch({
      type: DISPATCH_SET_VALUE,
      name: "process",
      value: false,
    });

    dispatch({
      type: DISPATCH_SET_TOAST,
      variant: "warning",
      message: "Mohon isikan semua kolom",
    });
    return;
  };

  const handleUpdateNote = async (e) => {
    const {
      id_catatan,
      id_sasih,
      tgl_masehi,
      tgl_sasih,
      saka,
      jenis_tgl_sasih,
      judul,
      catatan,
    } = state.form;

    e.preventDefault();
    dispatch({
      type: DISPATCH_SET_TOAST,
      variant: "normal",
      message: "Mohon tunggu, proses sedang berlangsung",
    });
    dispatch({
      type: DISPATCH_SET_VALUE,
      name: "process",
      value: true,
    });

    if (catatan) {
      const formData = new FormData();
      formData.append("id_catatan", id_catatan);
      formData.append("judul", judul);
      formData.append("catatan", catatan);

      const request = await fetch(`${BASE_URL}/update_note.php`, {
        method: "POST",
        body: formData,
      });

      try {
        const result = await request.json();

        if (result.status === 200) {
          dispatch({
            type: DISPATCH_SET_TOAST,
            variant: "success",
            message: result.message,
          });

          await handleGetCalendar();

          dispatch({
            type: DISPATCH_SET_VALUE,
            name: "inlineModal",
            value: {
              ...state.inlineModal,
              data: {
                id_catatan,
                id_sasih,
                tgl_masehi: format(new Date(tgl_masehi), "d"),
                tgl_sasih,
                saka,
                jenis_tgl_sasih,
                judul,
                catatan,
              },
            },
          });
        } else {
          dispatch({
            type: DISPATCH_SET_TOAST,
            variant: result.status === 400 ? "warning" : "error",
            message: result.message,
          });
        }
      } catch (err) {
        dispatch({
          type: DISPATCH_SET_TOAST,
          variant: "error",
          message: "Proses gagal, silahkan coba kembali...",
        });
      }

      dispatch({
        type: DISPATCH_SET_VALUE,
        name: "process",
        value: false,
      });
      return;
    }

    dispatch({
      type: DISPATCH_SET_VALUE,
      name: "process",
      value: false,
    });

    dispatch({
      type: DISPATCH_SET_TOAST,
      variant: "warning",
      message: "Mohon isikan semua kolom",
    });
    return;
  };

  useEffect(() => {
    handleGetCalendar();
  }, [state.date]);

  useEffect(() => {
    if (localStorage.getItem("id")) {
      dispatch({
        type: DISPATCH_SET_VALUE,
        name: "loggedIn",
        value: true,
      });
    }
  }, []);

  return (
    <Context.Provider
      value={{
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
      }}
    >
      {children}
      <Toast
        variant={state.toast.variant}
        show={state.toast.show}
        onClose={() => dispatch({ type: DISPATCH_SET_CLOSE_TOAST })}
        disableAutoHide={state.progress}
      >
        {state.toast.message}
      </Toast>
      <Modal
        header={
          <div>
            <Text variant="h6">
              {state.modal.mode === "add" ? "Tambah" : "Ubah"} Catatan
            </Text>
            <Text variant="paragraph" noMargin>
              Mohon isikan semua kolom berikut untuk
              {state.modal.mode === "add"
                ? " menambahkan catatan "
                : " mengubah catatan "}
              Anda
            </Text>
          </div>
        }
        show={state.modal.show}
        classNameOptions={{
          body: classes.modalBody,
        }}
        onClose={
          state.process
            ? null
            : () =>
                dispatch({
                  type: DISPATCH_SET_VALUE,
                  name: "modal",
                  value: { ...state.modal, show: false },
                })
        }
      >
        <form
          onSubmit={
            state.process
              ? (e) => e.preventDefault()
              : state.modal.mode === "add"
              ? handleAddNote
              : handleUpdateNote
          }
        >
          <TextInput
            variant="outlined"
            label="Tanggal Masehi"
            value={format(new Date(state.form.tgl_masehi), "dd MMMM yyyy", {
              locale: id,
            })}
            fullWidth
            readonly
          />
          <TextInput
            variant="outlined"
            label="Judul"
            value={state.form.judul}
            onChange={(e) =>
              dispatch({
                type: DISPATCH_SET_VALUE,
                name: "form",
                value: { ...state.form, judul: e.target.value },
              })
            }
            fullWidth
            required
          />
          <TextInput
            variant="outlined"
            label="Catatan"
            value={state.form.catatan}
            onChange={(e) =>
              dispatch({
                type: DISPATCH_SET_VALUE,
                name: "form",
                value: { ...state.form, catatan: e.target.value },
              })
            }
            fullWidth
            multiline
            required
          />
          <Button
            type="submit"
            variant="outlined"
            className={classes.modalSubmitButton}
          >
            Simpan
          </Button>
        </form>
      </Modal>
    </Context.Provider>
  );
};

export { Context, ContextProvider };
