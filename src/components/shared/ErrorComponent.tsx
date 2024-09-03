import errorIcon from "../../assets/errorIcon.png";
import { useEffect, useState } from "react";

interface IProps {
	message?: string;
}

const ErrorComponent = (props: IProps) => {
	const [shouldUnmount, setShouldUnmount] = useState(false);

	useEffect(() => {
		const timerId = setTimeout(() => {
			setShouldUnmount(true);
		}, 10000);

		return () => clearTimeout(timerId);
	}, []);

	if (shouldUnmount) return null;

	return (
		<div className="absolute left-5 bottom-5 flex justify-center items-center border border-border-color rounded p-4 bg-white">
			<img src={errorIcon} alt="error icon" />
			<p className={"text-red-800 ml-4"}>{props.message ? props.message : "Ops! something gone wrong!"}</p>
		</div>
	);
};

export default ErrorComponent;
