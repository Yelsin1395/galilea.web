import Footer from '@/components/footer/footer'
import Navbar from '@/components/navbar/navbar'

export default function PagesLayout({ children }) {
	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	)
}
