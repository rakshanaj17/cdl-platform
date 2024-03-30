import React from 'react';
import { useMemo, useState, useEffect,useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import Box from '@mui/material/Box';
import { Tooltip, Typography } from '@mui/material';
import useSubmissionStore from '../../store/submissionStore';


export default function SubmissionStatistics({ submitRelevanceJudgements, fetchSubmissionStats }) {
    const { submissionStats } = useSubmissionStore();
    const [likeButtonState, setLikeButtonState] = useState(false);
    const [dislikeButtonState, setDislikeButtonState] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
         fetchSubmissionStats();
      }, []);
    
      const handleLike = useCallback(async (event) => {
        event.preventDefault();
        if (likeButtonState) {
            return; 
        }
        setIsLoading(true);
        await submitRelevanceJudgements(event, 1);
        await fetchSubmissionStats();
        setLikeButtonState(true);
        setDislikeButtonState(false);
        setIsLoading(false);
      },[likeButtonState,submissionStats])

      const handleDislike = useCallback( async (event) => {
        event.preventDefault();
        if (dislikeButtonState) {
            return; 
        }
        setIsLoading(true);
        await submitRelevanceJudgements(event, 0);
        await fetchSubmissionStats();
        setDislikeButtonState(true);
        setLikeButtonState(false);
        setIsLoading(false);
      },[dislikeButtonState,submissionStats]);
   
    const submissionProps = useMemo(() => ({ submissionStats }), [submissionStats]);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: 1,
                    borderRadius: '30px',
                    overflow: 'hidden',
                    paddingX: '4px',
                    borderColor: 'gray',
                }}
            >
                <Tooltip title="Like">
                    <IconButton size="small" aria-label="Like" onClick={handleLike} className={likeButtonState === true ? "Mui-selected" : ""} disabled={isLoading} > {/* {(event) => submitRelevanceJudgements(event, 1)}*/}
                        <ThumbUpRoundedIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Typography sx={{ borderRight: '1px solid #ccc', paddingX: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                    {submissionStats.likes}
                </Typography>
                <Tooltip title="Dislike">
                    <IconButton size="small" aria-label="Dislike" onClick={handleDislike} className={dislikeButtonState === true ? "Mui-selected" : ""} disabled={isLoading}>
                        <ThumbDownRoundedIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Typography sx={{ borderRight: '1px solid #ccc', paddingX: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                    {submissionStats.dislikes}
                </Typography>
                <Tooltip title="The number of times that this submission has been viewed.">
                    <IconButton size="small" aria-label="view">
                        <VisibilityIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Typography sx={{ borderRight: '1px solid #ccc', paddingX: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                    {submissionStats.views}
                </Typography>
                <Tooltip title="The number of communities that this submission is in.">
                    <IconButton size="small" aria-label="go">
                        <ArrowForwardIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Typography sx={{ borderRight: '1px solid #ccc', paddingX: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                    {submissionStats.shares}
                </Typography>
                <Tooltip title="The number times this submission has been clicked in search or recommendation results.">
                    <IconButton size="small" aria-label="touch">
                        <TouchAppIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Typography sx={{ paddingX: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                    {submissionStats.clicks}
                </Typography>
            </Box>
        </>
    )
}
