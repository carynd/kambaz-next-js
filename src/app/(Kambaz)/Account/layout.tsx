"use client";
import store from "../store";
import { ReactNode } from "react";
import AccountNavigation from "./Navigation";
import { Provider } from "react-redux";
export default function AccountLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Provider store={store}>
      <div id="wd-kambaz">
        <table>
          <tbody>
            <tr>
              <td valign="top">
                <AccountNavigation />
              </td>
              <td valign="top" width="100%">
                {children}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Provider>
  );
}
