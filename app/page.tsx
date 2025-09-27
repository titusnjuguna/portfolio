import Layout from "@/components/layout/Layout"
import Blog1 from "@/components/sections/Blog2"
import Contact1 from "@/components/sections/Contact2"
import Home1 from "@/components/sections/Home2"
import Projects1 from "@/components/sections/Projects2"
import Service1 from "@/components/sections/Service2"
import Skills1 from "@/components/sections/Skills2"
import Static1 from "@/components/sections/Static2"
import Experience1 from "@/components/sections/Experience2"


export default function Home() {

	return (
		<>
			<Layout headerStyle={1} footerStyle={1}>
				<Home1 />
				<Static1 />
				<Experience1/>
				<Service1 />
				<Projects1 />
				<Skills1 />
				<Blog1 />
				<Contact1 />
			</Layout>
		</>
	)
}