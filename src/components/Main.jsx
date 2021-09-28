import styles from "./Main.module.scss";
import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import Generate from './Generate';
import About from './About';
import Usage from './Usage';

const Main = (props) => {
  

  const location = useLocation();
  const transitions = useTransition(location, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
  });
  transitions(({ props, item, key }) => console.log(props, item, key));

  return (
    <main className={styles.main} style={{ position: "relative" }}>
      {transitions((props, item) => (
        <animated.div style={props}>
          <div style={{ position: "absolute", width: "100%", left: 0, top: 0 }}>
            <Switch location={item}>
              <Route path="/" exact>
                <h2>Generate QR-code</h2>
                <Generate />
              </Route>
              <Route path="/usage" exact>
                <h2>Usage of QR-codes</h2>
                <Usage />
              </Route>
              <Route path="/about" exact>
                <h2>About</h2>
                <About />
              </Route>
            </Switch>
          </div>
        </animated.div>
      ))}
    </main>
  );
};

export default Main;
