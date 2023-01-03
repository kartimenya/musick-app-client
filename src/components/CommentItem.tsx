import { Box, Card } from '@mui/material';
import React, { FC } from 'react';
import styles from '../styles/CommentItem.module.css';

interface ICommentItem {
  text: string;
  username: string;
}

const CommentItem: FC<ICommentItem> = ({ text, username }) => {
  return (
    <div className={styles.comment}>
      <Box p={2}>
        <p className={styles.username}>{username}</p>
        <p className={styles.text}>{text}</p>
      </Box>
    </div>
  );
};

export default CommentItem;
