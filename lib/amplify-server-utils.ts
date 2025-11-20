import { cookies } from "next/headers";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { fetchAuthSession } from "aws-amplify/auth/server";
// Amplifyの設定ファイルをインポート
import outputs from "../amplify_outputs.json";

// Amplifyのサーバーランナーを作成
const serverRunner = createServerRunner({
  config: outputs,
});

export const { runWithAmplifyServerContext } = serverRunner;

// サーバーサイドでcookieに問い合わせて認証セッションを取得する関数
// それをSTSに問い合わせてアカウントが正しければユーザー情報と認証情報を取得する
export async function AuthFetchAuthSessionServer() {
  try {
    const session = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec: any) => fetchAuthSession(contextSpec),
    });
    return session;
  } catch (error) {
    return null;
  }
}
