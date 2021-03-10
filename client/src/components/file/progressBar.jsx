import React, { useEffect } from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from "react-redux";
import { StartUpload } from "../../action/file";
import { size, toArray } from "lodash";

function UploadProgress({ file,StartUpload }) {
  useEffect(() => {
    const fileToUpload = toArray(file).filter((file) => file.progress === 0);
    StartUpload(fileToUpload);
  }, [size(file)]);

  return (
    <div className="" style={{width:"100%"}}>
      {size(file)
        ? toArray(file).map((f) => (
           /*  <Box position="relative" display="inline-flex">
              <CircularProgress variant="determinate" value={f.progress} />
              <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
                
              >
                <Typography
                  variant="caption"
                  component="div"
                  color="textSecondary"
                >{`${Math.round(f.progress)}%`}</Typography>
              </Box>
            </Box> */
            <LinearProgress variant="determinate" value={f.progress} />
          ))
        : null}
    </div>
  );
}

UploadProgress.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  return {
    file: state.fileProgress.file,
  };
};

export default connect(mapStateToProps,{StartUpload})(UploadProgress);
