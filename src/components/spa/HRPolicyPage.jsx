import DocViewerPage from './DocViewerPage'

export default function HRPolicyPage() {
  return (
    <DocViewerPage
      eyebrow="Administration"
      title="HR"
      titleEm="Policy"
      description="The Human Resource Policy of KMIT outlines the duties, responsibilities, and performance standards for faculty and staff, ensuring a professional and growth-oriented environment."
      breadcrumbs={[{ label: 'Administration' }, { label: 'HR Policy' }]}
      pdfUrl="https://kmit.in/administration/assets/KMIT-%20HR%20POLICY.pdf"
      icon="fa-address-card"
      introText={[
        "Any professional institution, aspiring for growth and development in the field of education, should have a clear vision of its policies and procedures for the furtherance and fruition of its activities. Not with standing good infrastructure in terms of buildings, laboratories, staff and other amenities, over-all academic achievement will be painfully low if the procedures, duties, responsibilities and target of every member of the teaching faculty and other employees are not clearly defined and strictly adhered to.",
        "Individuals can put in their best efforts and direct their energies to the total fulfillment of their tasks, only if their duties and responsibilities are clearly known to them. Efficient functioning, achieving the targets, building individual profiles, avoidance of confusion and creation of good rapport with colleagues are possible only if the individuals are fully aware of the procedures and policies."
      ]}
    />
  )
}
