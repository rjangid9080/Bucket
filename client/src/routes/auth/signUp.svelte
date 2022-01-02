<!--User Registration-->
<div class="w-full p-4 flex justify-center rounded">
	<form action="#" class="w-full md:w-1/3  flex flex-col justify-center shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
		<h1 class="mt-2 mb-2 text-2xl text-gray-700 font-semibold sm:text-xl">
			<i class="fas fa-user-plus text-cyan-500 text-xl sm:text-2xl mr-2 ml-2 p-2"></i> 
			Sign Up </h1>
		<div class="flex flex-col">
			<label class="pt-2 pb-2 text-gray-500" for="username">Name</label>
			<span class="w-full flex flex-row bg-cyan-50 rounded">
				<i class="fas fa-user-circle text-gray-500 text-xl sm:text-2xl mr-2 ml-2 p-2 w-1/12"></i>
				<input class="p-1 w-11/12 apperance-none bg-cyan-50 focus:outline-none " id="username" type="text">
			</span>
		</div>
		<div class="flex flex-col">
			<label class="pt-2 pb-2 text-gray-500" for="email">Email</label>
			<span class="w-full flex flex-row bg-cyan-50 rounded">
				<i class="fas fa-at text-gray-500 text-xl sm:text-2xl mr-2 ml-2 p-2 w-1/12"></i>
				<input class="p-1 bg-cyan-50 w-11/12 appearance-none focus:outline-none" id="email" type="email">
			</span>
		</div>
		<div class="flex flex-col">
			<label class="pt-2 pb-2 text-gray-500" for="phone-number">Phone Number</label>
			<span class="w-full flex flex-row bg-cyan-50 rounded">
				<i class="fas fa-phone text-gray-500 text-xl sm:text-2xl mr-2 ml-2 p-2 w-1/12"></i>
				<input class="p-1 bg-cyan-50 w-11/12 appearance-none focus:outline-none" id="phone-number" type="text">
			</span>
		</div>
		<div class="flex flex-col">
			<label class="pt-2 pb-2 text-gray-500" for="password">Password</label>
			<span class="w-full flex flex-row bg-cyan-50 rounded">
				<i class="fas fa-key text-gray-500 text-xl sm:text-2xl mr-2 ml-2 p-2 w-1/12"></i>
				<input class="p-1 bg-cyan-50 w-11/12 appearance-none focus:outline-none" id="password" type="password">
			</span>
		</div>
		<div class="flex flex-col">
			<label class="pt-2 pb-2 text-gray-500" for="confirm-password">Confirm Password</label>
			<span class="w-full flex flex-row bg-cyan-50 rounded">
				<i class="fas fa-key text-gray-500 text-xl sm:text-2xl mr-2 ml-2 p-2 w-1/12"></i>
				<input class=" p-1 bg-cyan-50 w-11/12 appearance-none focus:outline-none" id="confirm-password" type="password">
			</span>
		</div>
		<div class="mt-4 flex w-full flex-col self-center" >
			<span class="text-center p-1 m-2 text-xs font-semibold text-gray-500">By continuing, I agree 
				<span class="text-cyan-500 hover:text-cyan-600 text-xs
				font-semibold">Terms of Use</span> & 
				<span class="text-cyan-500 hover:text-cyan-600 text-xs
				font-semibold">Privacy Policy</span>
			</span>
		<button class="rounded pt-2 pb-2 pr-3 pl-3 text-white font-medium 
		bg-cyan-500 hover:bg-cyan-600 shadow">Register</button>
		</div>
		<span class="text-center p-1 m-2 text-xs font-semibold text-gray-500">Alreday Registerd
			<a href="./signIn" class="text-cyan-500 hover:text-cyan-600 text-xs
			font-semibold">Sign In here</a>
		</span>
	</form>
</div>
<!--End user Registration-->