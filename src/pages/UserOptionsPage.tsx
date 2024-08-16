import UserDetailsForm from "../components/UserDetailsForm.tsx";
import UserResetPasswordForm from "../components/UserResetPasswordForm.tsx";
import UserCreateProfilePictureForm from "../components/UserCreateProfilePictureForm.tsx";

const UserOptionsPage = () => {
	return (
		<main className={"w-full min-h-full flex flex-col items-center"}>
			<UserDetailsForm />
			<UserResetPasswordForm />
			<UserCreateProfilePictureForm />
		</main>
	);
};

export default UserOptionsPage;
