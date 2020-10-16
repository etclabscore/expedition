import * as React from "react";
import { IconButton, Menu, MenuItem, ListItemText, ListItemSecondaryAction, Input, ListItemIcon, Tooltip } from "@material-ui/core"; //tslint:disable-line
import { NavigateNext, NavigateBefore } from "@material-ui/icons";
import SettingsIcon from "@material-ui/icons/Settings";
import { useTranslation } from "react-i18next";

interface IConfigurationMenuProps {
  onChange: (type: string, url: string) => any;
}

interface IPagedMenuProps {
  onChange: (type: string, url: string) => any;
}

const PagedMenu: React.FC<IPagedMenuProps> = (props) => {
  const [selected, setSelected] = React.useState<"service-runner" | "ethereum-rpc" | null>(null);
  const { t } = useTranslation();
  const nameMap = {
    "service-runner": t("Service Runner RPC Url"),
    "ethereum-rpc": t("Ethereum RPC Url"),
  };

  if (selected) {
    return (
      <>
        <MenuItem onClick={() => setSelected(null)}>
          <ListItemIcon>
            <NavigateBefore />
          </ListItemIcon>
          <ListItemText>
            {t("Back")}
          </ListItemText>
        </MenuItem>
        <Input
          onChange={(e) => props.onChange(selected, e.currentTarget.value)}
          placeholder={nameMap[selected]}
          fullWidth={true}
        />
      </>
    );
  }

  return (
    <>
      <MenuItem onClick={() => setSelected("service-runner")}>
        <ListItemText>
          {t("Service Runner RPC")}
          </ListItemText>
        <ListItemSecondaryAction>
          <NavigateNext />
        </ListItemSecondaryAction>
      </MenuItem>
      <MenuItem onClick={() => setSelected("ethereum-rpc")}>
        <ListItemText>
          {t("Ethereum RPC")}
          </ListItemText>
        <ListItemSecondaryAction>
          <NavigateNext />
        </ListItemSecondaryAction>
      </MenuItem>
    </>
  );

};

const ConfigurationMenu: React.FC<IConfigurationMenuProps> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<any>(null);
  const { t } = useTranslation();
  const open = !!anchorEl;

  function handleMenu(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <>
      <Tooltip title={t("Configuration") as string}>
        <IconButton
          aria-label="Configuration"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <SettingsIcon color="action"/>
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        getContentAnchorEl={null}
        anchorEl={anchorEl}
        keepMounted
        open={open}
        PaperProps={{
          style: {
            width: "250px",
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handleClose}
      >
        <PagedMenu onChange={props.onChange}></PagedMenu>
      </Menu>
    </>
  );
};

export default ConfigurationMenu;
