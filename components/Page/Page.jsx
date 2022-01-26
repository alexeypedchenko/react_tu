import React, {Fragment} from 'react';
import styles from './Page.module.scss'

const Page = ({ page }) => {
  return (
    <div>
      {page.blocks.map((block) => (
        <Fragment ket={block.id}>
          {block.type === 'text' ? (
            <p className={styles.text}>
              {block.content}
            </p>
          ) : block.type === 'image' ? (
            <div className={styles.image}>
              <img src={block.content} />
              <span>image name</span>
            </div>
          ) : (
            <p>{block.type}</p>
          )}
        </Fragment>
      ))}
    </div>
  );
};

Page.defaultProps = {
  page: {
    blocks: []
  }
}

export default Page;
