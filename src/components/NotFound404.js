import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const NotFound404 = () => (
  <Container>
    <Grid container alignContent="center" direction="column">
      <Grid item xs={6}>
        <Grid container>
          <Typography variant="h1" id="header404">
            404.
          </Typography>
          <Typography>We couldn&apos;t find that page.</Typography>
          <Typography>Please check the link and try again.</Typography>
          <Button color="primary" variant="contained" size="large" href="/">
            Back to the home page
          </Button>
        </Grid>
      </Grid>
    </Grid>
  </Container>
);

export default NotFound404;
