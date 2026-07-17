import DocViewerPage from './DocViewerPage'

export default function PerspectivePlanPage() {
  return (
    <DocViewerPage
      eyebrow="Administration"
      title="Perspective"
      titleEm="Plan"
      description="KMIT's strategic roadmap for institutional excellence, focusing on innovation centers, academic research, and global education standards."
      breadcrumbs={[{ label: 'Administration' }, { label: 'Perspective Plan' }]}
      pdfUrl="https://kmit.in/administration/assets/Perspective_Plan.pdf"
      icon="fa-map-location-dot"
      introText={[
        "KMIT has several notable innovations to its credit. We have created the Tessellator (Test and collate) which has radically and dramatically enriched our Teaching learning process. Other extremely useful products we have built are \"Sanjaya\" app and the \"Netra\" app for parent and student awareness and participation. Several more products are being planned to assist and enable teaching and learning process.",
        "One of the tools being planned is for customized education for every student. We wish to use technology to ensure that we move away from \"one size fits all\" philosophy of education and ensure that we created a learning environment where in every student will learn based on the students individual capabilities."
      ]}
    />
  )
}
