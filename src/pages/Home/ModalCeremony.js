import React from "react";
import PropTypes from "prop-types";
import Text from "../../components/Text";
import Divider from "../../components/Divider";
import Grid from "../../components/Grid";
import CalendarIcon from "mdi-react/CalendarIcon";
import MapMarkerIcon from "mdi-react/MapMarkerIcon";
import { createUseStyles } from "react-jss";
import { id } from "date-fns/locale";
import { format } from "date-fns";
import { SASIH_DATE_TYPE, SASIH } from "../../utils/constants";

const useStyles = createUseStyles({
  root: {
    position: "relative",
    height: "100%",
  },
  thumbnail: {
    height: 240,
    width: 400,
    objectFit: "cover",
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

const ModalCeremony = (props) => {
  const { date, data } = props;
  const classes = useStyles();

  return data ? (
    <div className={classes.root}>
      <img
        src={data.foto_upacara}
        alt="Foto Upacara"
        className={classes.thumbnail}
      />
      <div className={classes.sectionWrapper}>
        <div className={classes.section}>
          <Text variant="title">{data.upacara}</Text>
          <Text variant="subtitle" color="gray" noMargin>{`${
            data.tgl_masehi
          } ${format(date, "MMMM yyyy", { locale: id })}`}</Text>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.section}>
          <Text variant="paragraph" noMargin>
            {data.keterangan
              ? data.keterangan
              : "Belum ada keterangan terkait dengan upacara ini"}
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
          <Grid type="item" xs={2} className={classes.sectionItem}>
            <MapMarkerIcon color="#66788A" />
          </Grid>
          <Grid type="item" xs={10}>
            <Text variant="paragraph" noMargin>
              {data.lokasi}
            </Text>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
      </div>
    </div>
  ) : null;
};

ModalCeremony.propTypes = {
  date: PropTypes.instanceOf(Date),
  data: PropTypes.object,
};

export default ModalCeremony;
