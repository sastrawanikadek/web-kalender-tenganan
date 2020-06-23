import React from "react";
import PropTypes from "prop-types";
import LoadingDefault from "./LoadingDefault";
import LoadingWave from "./LoadingWave";
import LoadingProgress from "./LoadingProgress";

const LoadingView = props => {
  const { variant, ...loadingProps } = props;

  switch (variant) {
    case "default":
      return <LoadingDefault {...loadingProps} />;
    case "wave":
      return <LoadingWave {...loadingProps} />;
    case "progress":
      return <LoadingProgress {...loadingProps} />;
    default:
      return <LoadingDefault {...loadingProps} />;
  }
};

LoadingView.defaultProps = {
  show: false,
  random: true,
  overlay: false,
  color: "currentColor",
  size: 80
};

LoadingView.propTypes = {
  /**
   * Show the loading.
   * @defaultValue false.
   */
  show: PropTypes.bool,

  /**
   * Random the loading color.
   * Default to true.
   */
  random: PropTypes.bool,

  /**
   * Size of the loading
   */
  size: PropTypes.number,

  /**
   * Display loading with overlay
   * @defaultValue false
   */
  overlay: PropTypes.bool,

  /**
   * Variant of the Loading
   * 1. default
   * 2. wave
   * 3. progress
   */
  variant: PropTypes.oneOf(["default", "wave", "progress"]),

  /**
   * Text below the Loading
   */
  label: PropTypes.string,

  /**
   * Color of the loading
   */
  color: PropTypes.string,

  /**
   * LoadingWave Props width of bars.
   * Default 50px.
   */
  width: PropTypes.string,

  /**
   * LoadingWave Props height of bars.
   * Default 300px.
   */
  height: PropTypes.string,

  /**
   * LoadingWave Props background of bars and pages.
   * Default white.
   */
  background: PropTypes.string,

  /**
   * Override default styles with className
   */
  className: PropTypes.string,

  /**
   * Override default styles with inline style
   */
  style: PropTypes.object,

  /**
   * Progressed Data
   */
  data: PropTypes.any,

  /**
   * Fullscreen Loading Progress
   */
  fullscreen: PropTypes.bool
};

export default LoadingView;
