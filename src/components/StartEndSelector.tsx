/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Slider } from '@mui/material';
import { useContext } from 'react';
import { VideoContext } from '../contexts/VideoContext';
import { frameNumberToTimecode } from '../utils/frameNumberToTimecode';
import { FrameView } from './FrameView';

export const StartEndSelector = (props: {
  startFrameNumber: number;
  setStartFrameNumber: (newValue: number) => void;
  endFrameNumber: number;
  setEndFrameNumber: (newValue: number) => void;
}) => {
  const { frameCount, fps } = useContext(VideoContext);

  const handleRangeChange = (event: Event, newValue: number[]) => {
    props.setStartFrameNumber(newValue[0]);
    props.setEndFrameNumber(newValue[1]);
  };

  return (
    <div
      css={css({
        display: 'flex',
        flexDirection: 'column',
      })}
    >
      <div
        css={css({
          display: 'flex',
          justifyContent: 'space-between',
          gap: '8px',
        })}
      >
        <FrameView
          frameNumber={props.startFrameNumber}
          setFrameNumber={props.setStartFrameNumber}
          css={css({ maxWidth: '50%' })}
        />
        <FrameView
          frameNumber={props.endFrameNumber}
          setFrameNumber={props.setEndFrameNumber}
          css={css({ maxWidth: '50%' })}
        />
      </div>
      <div
        css={css({
          marginTop: '8px',
          padding: '0px 16px',
        })}
      >
        <Slider
          value={[props.startFrameNumber, props.endFrameNumber]}
          onChange={handleRangeChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => frameNumberToTimecode(value, fps)}
          min={0}
          max={frameCount - 1}
        />
      </div>
    </div>
  );
};
