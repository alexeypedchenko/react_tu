import React, {Fragment} from 'react';
import styles from './Page.module.scss'

const Page = ({ page }) => {
  return (
    <div>
      {page.blocks.map((block) => (
        block.active && (
        <Fragment key={block.id}>
          {block.type === 'text' ? (
            <div className={styles.text}>
              {block.content.title && (<h4>{block.content.title}</h4>)}
              {block.content.text && (<p>{block.content.text}</p>)}
            </div>
          ) : block.type === 'image' ? (
            <div className={styles.image}>
              <img src={block.content.url} alt={block.content.name} />
              {block.content.name && (<span>{block.content.name}</span>)}
            </div>
          ) : (
            <p>{block.type}</p>
          )}
        </Fragment>
      )
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
