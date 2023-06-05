// import { Link } from 'react-router-dom';
import { EnvironmentContext } from '@nyks-workspace/shared-ui';
import { Link } from '@mui/material';
import React from 'react';

const LinkMui = React.forwardRef<
  HTMLAnchorElement,
  {
    href: string;
    children: React.ReactNode;
  }
>((props, ref) => {
  const { href, ...other } = props;
  return <Link ref={ref} href={href} {...other} />;
});

const EnvironmentContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EnvironmentContext.Provider
      value={{
        Link: LinkMui,
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  );
};

export { EnvironmentContextProvider };
