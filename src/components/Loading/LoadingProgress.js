import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Text from "../Text";
import Grid from "../Grid";
import { createUseStyles } from "react-jss";
import { color } from "../../utils/theme";

const useStyles = createUseStyles({
  "@keyframes progress": {
    "0%": { transform: "translateX(-200%)" },
    "100%": { transform: "translateX(200%)" }
  },
  fullscreen: {
    minHeight: "100vh",
    boxSizing: "border-box",
    backgroundColor: "#FEFCFE"
  },
  image: {
    height: 250,
    maxWidth: "100%",
    display: "block",
    margin: "0 auto"
  },
  label: {
    marginTop: 16,
    marginBottom: 16
  },
  loadingBar: {
    height: 30,
    width: "100%",
    border: `1px solid ${color.primary}`,
    borderRadius: 100,
    position: "relative",
    overflow: "hidden",
    "&:before": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "80%",
      opacity: 0.2,
      backgroundColor: "white",
      transform: "translateX(-200%)",
      zIndex: 100,
      animationName: "$progress",
      animationDuration: "3s",
      animationTimingFunction: "linear",
      animationIterationCount: "infinite"
    },
    "&:after": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "80%",
      opacity: 0.2,
      backgroundColor: "white",
      transform: "translateX(-200%)",
      zIndex: 100,
      animationName: "$progress",
      animationDuration: "3s",
      animationDelay: "1.5s",
      animationTimingFunction: "linear",
      animationIterationCount: "infinite"
    }
  },
  loadingIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: 0,
    backgroundColor: color.primary,
    transition: "width 0.3s ease-in-out"
  }
});

const LoadingProgress = props => {
  const { data, label, fullscreen } = props;
  const classes = useStyles();
  const [loadedData, setLoadedData] = useState(0);

  useEffect(() => {
    const filteredData = Object.values(data).filter(value => value);
    setLoadedData(filteredData.length);
  }, [data]);

  return (
    <Grid
      type="container"
      justifyContent="center"
      alignItems="center"
      className={fullscreen && classes.fullscreen}
    >
      <Grid type="item" xs={12} md={8}>
        <img
          src="/assets/loading-finoo.gif"
          alt="Loading"
          className={classes.image}
        />
        <Text variant="title" align="center" className={classes.label}>
          {label ? label : "Please wait while we load your data"}
        </Text>
        {data ? (
          <Fragment>
            <div className={classes.loadingBar}>
              <div
                className={classes.loadingIndicator}
                style={{
                  width: `${(loadedData / Object.values(data).length) * 100}%`
                }}
              />
            </div>
            <Text
              variant="subtitle"
              color="rgba(0, 0, 0, 0.55)"
              align="center"
              className={classes.label}
            >
              {`${loadedData}/${Object.values(data).length} Data Loaded`}
            </Text>
          </Fragment>
        ) : null}
      </Grid>
    </Grid>
  );
};

LoadingProgress.propTypes = {
  data: PropTypes.any.isRequired,
  label: PropTypes.string
};

export default LoadingProgress;
