import { SVGProps } from "react";

export default function HILightBulb(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" {...props}>{/* Icon from HeroIcons by Refactoring UI Inc - https://github.com/tailwindlabs/heroicons/blob/master/LICENSE */}<path fill="currentColor" d="M10.618 10.26c-.361.223-.618.598-.618 1.022c0 .226-.142.43-.36.49A6 6 0 0 1 8 12c-.569 0-1.12-.08-1.64-.227a.504.504 0 0 1-.36-.491c0-.424-.257-.799-.618-1.021a5 5 0 1 1 5.235 0m-3.75 3.154a.75.75 0 1 0-.225 1.483a9 9 0 0 0 2.716 0a.75.75 0 1 0-.225-1.483a7.6 7.6 0 0 1-2.266 0"></path></svg>
  )
}
