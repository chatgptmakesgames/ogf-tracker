import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

import countries from "./data/countries.json";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function TopCard() {
	countries.sort((a, b) => a.country.localeCompare(b.country));
	const [selected, setSelected] = useState(countries[1]);
	const [selected2, setSelected2] = useState(countries[1]);
	// https://www.youtube.com/watch?v=fn-Dz9OZWJM
	return (
		<div
			className="h-64 top-16 left-4 absolute inset-0 block p-3 max-w-sm bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg  shadow-md hidden md:block"
			style={{ zIndex: 999 }}
		>
			<h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
				Track Flights
			</h5>

			<form>
				<label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
					Search
				</label>
				<div className="relative">
					<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
						<svg
							aria-hidden="true"
							className="w-5 h-5 text-gray-500 dark:text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
						</svg>
					</div>
					<input
						type="search"
						id="default-search"
						className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
						placeholder="Search Flights..."
						required
					/>
					<button
						type="submit"
						className="text-white absolute right-2.5 bottom-1.5 bg-blue-500 hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
					>
						Search
					</button>
				</div>
			</form>

			<Listbox value={selected} onChange={setSelected}>
				{({ open }) => (
					<>
						<Listbox.Label className="block text-sm font-medium text-white pb-0.5 pl-0.5 pt-1.5">
							Destinations From:
						</Listbox.Label>
						<div className="mt-1 relative">
							<Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
								<span className="flex items-center">
									<img
										src={selected.flag}
										alt=""
										className="flex-shrink-0 h-5 w-9"
									/>
									<span className="ml-3 block truncate">
										{selected.country}
									</span>
								</span>
								<span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
									<SelectorIcon
										className="h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
								</span>
							</Listbox.Button>

							<Transition
								show={open}
								as={Fragment}
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
									{countries.map((place) => (
										<Listbox.Option
											key={place.country}
											className={({ active }) =>
												classNames(
													active ? "bg-blue-100" : "text-gray-900",
													"cursor-default select-none relative py-2 pl-3 pr-9",
												)
											}
											value={place}
										>
											{({ selected, active }) => (
												<>
													<div className="flex items-center">
														<img
															src={place.flag}
															alt=""
															className="flex-shrink-0 h-5 w-9"
														/>
														<span
															className={classNames(
																selected ? "font-semibold" : "font-normal",
																"ml-3 block truncate",
															)}
														>
															{place.country}
														</span>
													</div>

													{selected ? (
														<span
															className={classNames(
																"absolute text-green-600 inset-y-0 right-0 flex items-center pr-4",
															)}
														>
															<CheckIcon
																className="h-5 w-5"
																aria-hidden="true"
															/>
														</span>
													) : null}
												</>
											)}
										</Listbox.Option>
									))}
								</Listbox.Options>
							</Transition>
						</div>
					</>
				)}
			</Listbox>

			<Listbox value={selected2} onChange={setSelected2}>
				{({ open }) => (
					<>
						<Listbox.Label className="block text-sm font-medium text-white pb-0.5 pl-0.5 pt-1.5">
							Destinations From:
						</Listbox.Label>
						<div className="mt-1 relative">
							<Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
								<span className="flex items-center">
									<img
										src={selected2.flag}
										alt=""
										className="flex-shrink-0 h-5 w-9"
									/>
									<span className="ml-3 block truncate">
										{selected2.country}
									</span>
								</span>
								<span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
									<SelectorIcon
										className="h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
								</span>
							</Listbox.Button>

							<Transition
								show={open}
								as={Fragment}
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
									{countries.map((place) => (
										<Listbox.Option
											key={place.country}
											className={({ active }) =>
												classNames(
													active ? "bg-blue-100" : "text-gray-900",
													"cursor-default select-none relative py-2 pl-3 pr-9",
												)
											}
											value={place}
										>
											{({ selected2, active }) => (
												<>
													<div className="flex items-center">
														<img
															src={place.flag}
															alt=""
															className="flex-shrink-0 h-5 w-9"
														/>
														<span
															className={classNames(
																selected2 ? "font-semibold" : "font-normal",
																"ml-3 block truncate",
															)}
														>
															{place.country}
														</span>
													</div>

													{selected2 ? (
														<span
															className={classNames(
																"absolute text-green-600 inset-y-0 right-0 flex items-center pr-4",
															)}
														>
															<CheckIcon
																className="h-5 w-5"
																aria-hidden="true"
															/>
														</span>
													) : null}
												</>
											)}
										</Listbox.Option>
									))}
								</Listbox.Options>
							</Transition>
						</div>
					</>
				)}
			</Listbox>
		</div>
	);
}
