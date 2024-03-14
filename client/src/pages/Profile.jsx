import { Link } from "react-router-dom"

const Profile = () => {
    return (
        <div>
            <div className="max-w-screen-xl mx-auto py-20 flex">
                <div className="w-1/3 pr-10">
                    <div className="w-full">
                        <h1 className="text-4xl font-bold">Профил</h1>
                        <div className="mt-6">
                            <div className="flex flex-col">
                                <label htmlFor="">Име</label>
                                <input className=" border-b-[2px] bg-gray-100 px-2 py-2 mb-5" type="text" placeholder="Име" />
                                <label htmlFor="">Фамилия</label>
                                <input className=" border-b-[2px] bg-gray-100 px-2 py-2 mb-5" type="text" placeholder="Фамилия" />
                                <label htmlFor="">E-mail</label>
                                <input className=" border-b-[2px] bg-gray-100 px-2 py-2 mb-5" type="text" placeholder="E-mail" />
                                <label htmlFor="">Стара парола</label>
                                <input className=" border-b-[2px] bg-gray-100 px-2 py-2 mb-5" type="text" placeholder="Стара парола" />
                                <label htmlFor="">Нова парола</label>
                                <input className=" border-b-[2px] bg-gray-100 px-2 py-2 mb-5" type="text" placeholder="Нова парола" />
                                <label htmlFor="">Телефон</label>
                                <input className=" border-b-[2px] bg-gray-100 px-2 py-2 mb-5" type="text" placeholder="Телефон" />
                                <button className="bg-black text-white text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300">Актуализирай</button>
                            </div>
                            <div className="flex mx-auto py-5">
                                <div className=" border-[1px] h-1">
                                </div>
                                <Link to="/">
                                    <p>Изход</p>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile