const ContactPage = () => {
	return (
		<main className={"w-full min-h-full flex flex-col items-center justify-center"}>
			<h1 className={"my-6"}>
				<span>Contact</span> Us
			</h1>
			<div className={"h-full flex md:flex-col md:items-center"}>
				<section className={"w-[650px] h-full mr-[80px] md:mr-0"}>
					<form action="" className={"w-[650px] md:w-full"}>
						<div className={"w-full flex gap-6 mb-6"}>
							<input type="text" placeholder={"name"} className={"border border-input-border-color rounded w-1/2 p-1"} />
							<input type="text" placeholder={"Surname"} className={"border border-input-border-color rounded w-1/2 p-1"} />
						</div>
						<input type="text" placeholder={"Subject"} className={"w-full border border-input-border-color rounded mb-6 p-1"} />
						<textarea placeholder={"Type your message"} className={"w-full h-153 border border-input-border-color rounded mb-6 p-1"} />
						<button className={"w-[165px] border border-input-border-color h-[45px] text-white bg-input-border-color rounded"}>
							Send message
						</button>
					</form>
				</section>
				<section className={"w-[400px] h-full md:mt-10 md:w-full"}>
					<p className={"mb-10"}>
						Dynamically underwhelm integrated outsourcing via timely models. Rapidiously reconceptualize visionary imperatives without
					</p>
					<p className={"mb-2"}>blog.noteblog@gmail.com</p>
					<p className={"mb-2"}>+886554 654654</p>
					<p className={"mb-2"}>9567 Turner Trace Apt. BC C3G8A4</p>
				</section>
			</div>
		</main>
	);
};

export default ContactPage;
