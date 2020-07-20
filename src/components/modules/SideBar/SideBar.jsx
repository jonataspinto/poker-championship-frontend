import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const SideBar = ({ anchor, setAnchor }) => {
  const classes = useStyles();

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={setAnchor()}
      onKeyDown={setAnchor()}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => {
          const Ukey = index;
          return (
            <ListItem button key={Ukey}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => {
          const Ukey = index;
          return (
            <ListItem button key={Ukey}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <>
      <Drawer
        anchor="left"
        open={anchor}
        onClose={setAnchor()}
      >
        {list("left")}
      </Drawer>
    </>
  );
};

SideBar.propTypes = {
  anchor: PropTypes.bool.isRequired,
  setAnchor: PropTypes.func.isRequired,
};

export default SideBar;
