import { Button } from '@obeya/shared/ui/design-system'

import styles from './index.module.css'

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>
              <span> Hello there, </span>
              Welcome obeya 👋
            </h1>
          </div>
          <Button text={'Hello, obeya!'} />
        </div>
      </div>
    </div>
  )
}

export default Index
