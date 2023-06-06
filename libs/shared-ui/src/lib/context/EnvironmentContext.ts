import { createContext } from 'react';
import { LinkProps } from '@mui/material/Link';
import React from 'react';

interface GreetingProps extends React.RefAttributes<HTMLHeadingElement> {
  href: string;
  children: React.ReactNode;
}

type LinkComposedProps<T> = {
  href: string;
  children: React.ReactNode;
  component: React.ComponentType<T>;
} & T;

interface MyContextProps<T> {
  LinkComponent: React.ForwardRefExoticComponent<
    React.PropsWithChildren<LinkComposedProps<T>> &
      React.RefAttributes<HTMLAnchorElement>
  >;
}

// export const EnvironmentContext = createContext<{
//   Link: React.ForwardRefRenderFunction<
//     HTMLAnchorElement,
//     {
//       href: string;
//       children: React.ReactNode;
//     } & LinkProps
//   >;
//   LinkNew: React.ForwardRefExoticComponent<
//     {
//       href: string;
//       children: React.ReactNode;
//     } & React.RefAttributes<HTMLAnchorElement>
//   >;
// //   LinkNew1: React.FunctionComponent<GreetingProps>;
//   LinkNew1: MyContextProps<any>;
// }>({
//   Link: (props, ref) => null,
//   LinkNew: React.forwardRef((props, ref) => null),
//   LinkNew1: React.forwardRef((props, ref) => null),
// });

export const EnvironmentContext = createContext<{
  Link: React.FunctionComponent<{
    href: string;
    children: React.ReactNode;
    [key: string]: any;
  }>;
}>({
  Link: () => null,
});
