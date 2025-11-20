"use client";

import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import outputs from "../amplify_outputs.json";

// Cookieへの保存:
// ssr: true を設定すると、Amplify は認証トークン（Cognitoのトークンなど）をブラウザの localStorage ではなく Cookie に保存するようになります。
// つまり、「この設定を書いている場所はクライアントサイド（use client）だが、アプリ全体としてはサーバーサイドレンダリング（SSR）を利用しており、サーバーとも認証状態を共有したい」 という意思表示になります。
Amplify.configure(outputs, {ssr: true});

export const Providers = ({children}: { children: React.ReactNode }) => {
  return (
    <Authenticator>
      {children}
    </Authenticator>
  );
}
