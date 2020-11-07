import * as React from "react";
import { Menu, MenuItem, Tooltip, Button, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { TNetwork } from "../../helpers/availableServiceToNetwork";

interface IProps {
  networks: TNetwork[];
  selectedNetwork?: TNetwork;
  setSelectedNetwork?: (network: TNetwork) => void;
}

const NetworkDropdown: React.FC<IProps> = (props) => {
  const { t } = useTranslation();
  const { selectedNetwork, setSelectedNetwork } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (network: TNetwork) => {
    setAnchorEl(null);
    if (setSelectedNetwork) {
      setSelectedNetwork(network);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>

      <Tooltip title={t("Change Network") as string}>
        <Button onClick={handleClick}>
          {selectedNetwork && selectedNetwork.name}
        </Button>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.networks.map((network, i) => (
          <MenuItem
            selected={selectedNetwork && selectedNetwork.name === network.name}
            onClick={(event) => handleMenuItemClick(network)}
          >
            <div>
              <Typography variant="body1">{network.name}</Typography>
              <Typography variant="caption">{network.summary}</Typography>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default NetworkDropdown;
