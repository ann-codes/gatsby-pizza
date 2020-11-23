# Gatsby Pizza

Following the Wes Bos [MasterGatsby](https://github.com/wesbos/master-gatsby.git) course.

May need to delete `package-lock.json` and/or `yarn.lock` in order to install. 


### Course Notes

<details>
<summary>Programmatic Navigation</summary>
v5 9:10 Making more app-like using Gatsby's `navigate` (though most of te time, we'd be using `Link`)

```javascript
import React from 'react';
import { Link, navigate } from 'gatsby';

const goToSliceMasters = () => {
  setTimeout(() => {
    navigate('/slicemasters', { replace: true });
  }, 2000);
};

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <button type="button" onClick={goToSliceMasters}>
            Click me to see SliceMasters after 2 seconds
          </button>
        </li>
      </ul>
    </nav>
  );
}
```
</details>

<details>
<summary>Hot Keys</summary>
- Select word and then edit next instance of it: Cmd + d
</details>