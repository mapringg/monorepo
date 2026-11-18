import { Screen } from "#/components/ui/screen.tsx";
import { SessionsSignInForm } from "#/features/sessions/sessions-sign-in-form.tsx";

export default function SignInScreen() {
  return (
    <Screen>
      <SessionsSignInForm />
    </Screen>
  );
}
