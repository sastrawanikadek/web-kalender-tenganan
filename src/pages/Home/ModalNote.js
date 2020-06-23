import React from "react";
import PropTypes from "prop-types";
import Text from "../../components/Text";
import Divider from "../../components/Divider";
import Grid from "../../components/Grid";
import Button from "../../components/Button";
import CalendarIcon from "mdi-react/CalendarIcon";
import { createUseStyles } from "react-jss";
import { id } from "date-fns/locale";
import { format } from "date-fns";
import { SASIH_DATE_TYPE, SASIH } from "../../utils/constants";
import { color } from "../../utils/theme";

const useStyles = createUseStyles({
  root: {
    position: "relative",
    height: "100%",
  },
  thumbnail: {
    height: 240,
    width: 400,
    backgroundImage: `linear-gradient(135deg, ${color.alt6}, ${color.alt7}, ${color.alt8})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionWrapper: {
    height: "calc(100% - 240px)",
    overflowY: "auto",
  },
  section: {
    padding: 16,
  },
  sectionItem: {
    textAlign: "center",
  },
  divider: {
    height: 0.9,
  },
});

const ModalNote = (props) => {
  const { date, data, onClick } = props;
  const classes = useStyles();

  return data ? (
    <div className={classes.root}>
      <div className={classes.thumbnail}>
        <img src="/note.svg" alt="Catatan" height="125" />
      </div>
      <div className={classes.sectionWrapper}>
        <div className={classes.section}>
          <Text variant="title">{data.judul}</Text>
          <Text variant="subtitle" color="gray" noMargin>{`${
            data.tgl_masehi
          } ${format(date, "MMMM yyyy", { locale: id })}`}</Text>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.section}>
          <Text variant="paragraph" noMargin>
            {data.catatan}
          </Text>
        </div>
        <Divider className={classes.divider} />
        <Grid type="container" padding={0} alignItems="center">
          <Grid type="item" xs={2} className={classes.sectionItem}>
            <CalendarIcon color="#66788A" />
          </Grid>
          <Grid type="item" xs={10}>
            <Text variant="paragraph" noMargin>{`${
              SASIH_DATE_TYPE[data.jenis_tgl_sasih]
            } ${data.tgl_sasih} Sasih ${SASIH[data.id_sasih]} Saka ${
              data.saka
            }`}</Text>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <div className={classes.section}>
          <Button variant="outlined" onClick={() => onClick(data)} fullWidth>
            Ubah Catatan
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};

ModalNote.propTypes = {
  date: PropTypes.instanceOf(Date),
  data: PropTypes.object,
  onClick: PropTypes.func,
};

export default ModalNote;
