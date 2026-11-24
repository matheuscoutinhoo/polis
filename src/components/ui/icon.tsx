import type { SVGProps } from "react";

const paths = {
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
  book: (
    <>
      <path d="M12 6.75C10.5 5.4 8.25 4.75 5 4.75H3.75v13.5H5c3.25 0 5.5.6 7 1.75 1.5-1.15 3.75-1.75 7-1.75h1.25V4.75H19c-3.25 0-5.5.65-7 2z" />
      <path d="M12 6.75V20" />
    </>
  ),
  event: (
    <>
      <rect x="3.75" y="5.25" width="16.5" height="15" rx="1.5" />
      <path d="M3.75 9.75h16.5M8 3v4M16 3v4M7.5 13.25h5M7.5 16.5h9" />
    </>
  ),
  community: <path d="M4.75 5.25h14.5v10.5h-9l-4 3.5v-3.5h-1.5z" />,
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="1.5" />
      <path d="M8 10.5V7.75a4 4 0 0 1 8 0v2.75M12 14.5v2.5" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  pause: <path d="M9 5v14M15 5v14" />,
  home: <path d="M4.25 10.25L12 4l7.75 6.25V20h-5.5v-5.5h-4.5V20h-5.5z" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.25" />
      <path d="M20 20l-4.6-4.6" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.75" />
      <path d="M4.75 20c.9-3.6 3.8-5.75 7.25-5.75s6.35 2.15 7.25 5.75" />
    </>
  ),
  chevronDown: <path d="M6 9l6 6 6-6" />,
  chevronRight: <path d="M9 6l6 6-6 6" />,
  chevronLeft: <path d="M15 6l-6 6 6 6" />,
  flag: <path d="M5.5 21V4.5h11l-2 4 2 4h-11" />,
  info: (
    <>
      <circle cx="12" cy="12" r="8.75" />
      <path d="M12 11v5.5M12 7.75v.5" />
    </>
  ),
  alert: <path d="M12 4.25l8.75 15.5H3.25zM12 10.25v4M12 16.75v.5" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  edit: <path d="M4.5 19.5l1-4L15.75 5.25a2 2 0 0 1 2.83 0l.17.17a2 2 0 0 1 0 2.83L8.5 18.5z" />,
  trash: <path d="M4.5 7h15M9.5 7V4.75h5V7M6.5 7l1 13h9l1-13M10 11v5.5M14 11v5.5" />,
  download: <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />,
  logout: <path d="M14.5 4.75h3.75a1 1 0 0 1 1 1v12.5a1 1 0 0 1-1 1H14.5M10 8l-4 4 4 4M6 12h9.5" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.25" />
      <path d="M12 7.75V12l3 2" />
    </>
  ),
  scale: <path d="M12 4v16M7 20h10M5 7h14M5 7l-2.5 6a2.75 2.75 0 0 0 5 0zM19 7l-2.5 6a2.75 2.75 0 0 0 5 0z" />,
  document: (
    <>
      <path d="M6.75 3.75h7.5l3.75 3.75v12.75h-11.25z" />
      <path d="M14 3.75V7.75h4M9.25 12h5.5M9.25 15.5h5.5" />
    </>
  ),
  shield: <path d="M12 3.75l7 2.75v5.25c0 4.25-3 7.25-7 8.5-4-1.25-7-4.25-7-8.5V6.5z" />,
  layers: <path d="M12 4l8.5 4.5L12 13 3.5 8.5zM3.5 12.5L12 17l8.5-4.5M3.5 16.25L12 20.75l8.5-4.5" />,
} as const;

export type IconName = keyof typeof paths;

type IconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: IconName;
  size?: number;
  title?: string;
};

export function Icon({ name, size = 20, title, className, ...rest }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
