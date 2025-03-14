import React from 'react';
import { List, ListItem, ListItemText, Box, Typography, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function VariableManager() {
  const [open, setOpen] = React.useState({
    unitPlan: true,
    inputs: true,
  });

  const handleClick = (section) => {
    setOpen({
      ...open,
      [section]: !open[section],
    });
  };

  return (
    <Box>
      <List component="nav" dense>
        <ListItem button onClick={() => handleClick('inputs')}>
          <ListItemText primary="Input Variables" />
          {open.inputs ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open.inputs} timeout="auto" unmountOnExit>
          <List component="div" disablePadding dense>
            <ListItem sx={{ pl: 4 }}>
              <ListItemText 
                primary="grade" 
                secondary={<Typography variant="caption">Number</Typography>}
              />
            </ListItem>
            <ListItem sx={{ pl: 4 }}>
              <ListItemText 
                primary="topic" 
                secondary={<Typography variant="caption">String</Typography>}
              />
            </ListItem>
            <ListItem sx={{ pl: 4 }}>
              <ListItemText 
                primary="outcomes" 
                secondary={<Typography variant="caption">String</Typography>}
              />
            </ListItem>
            <ListItem sx={{ pl: 4 }}>
              <ListItemText 
                primary="temperature" 
                secondary={<Typography variant="caption">Number</Typography>}
              />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={() => handleClick('unitPlan')}>
          <ListItemText primary="unit_plan" />
          {open.unitPlan ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open.unitPlan} timeout="auto" unmountOnExit>
          <List component="div" disablePadding dense>
            <ListItem sx={{ pl: 4 }}>
              <ListItemText 
                primary="unit_plan_id" 
                secondary={<Typography variant="caption">String</Typography>}
              />
            </ListItem>
            <ListItem sx={{ pl: 4 }}>
              <ListItemText 
                primary="unit_plan" 
                secondary={<Typography variant="caption">String</Typography>}
              />
            </ListItem>
            <ListItem sx={{ pl: 4 }}>
              <ListItemText 
                primary="grade" 
                secondary={<Typography variant="caption">Number</Typography>}
              />
            </ListItem>
            <ListItem sx={{ pl: 4 }}>
              <ListItemText 
                primary="outcomes" 
                secondary={<Typography variant="caption">String</Typography>}
              />
            </ListItem>
            <ListItem sx={{ pl: 4 }}>
              <ListItemText 
                primary="temperature" 
                secondary={<Typography variant="caption">Number</Typography>}
              />
            </ListItem>
            <ListItem sx={{ pl: 4 }}>
              <ListItemText 
                primary="user_context" 
                secondary={<Typography variant="caption">String</Typography>}
              />
            </ListItem>
          </List>
        </Collapse>

        <ListItem>
          <ListItemText 
            primary="Using variables in prompts:" 
            secondary={
              <Typography variant="caption">
                {"{variable_name}"} or {"{object.property}"}<br />
                Example: {"{unit_plan.outcomes}"} or {"{grade}"}
              </Typography>
            }
          />
        </ListItem>
      </List>
    </Box>
  );
} 