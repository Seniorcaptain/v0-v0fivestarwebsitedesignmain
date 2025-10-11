from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
import datetime

def generate_booking_confirmation_pdf(booking_data, filename):
    """
    Generate a professional booking confirmation PDF
    """
    doc = SimpleDocTemplate(filename, pagesize=A4)
    styles = getSampleStyleSheet()
    story = []
    
    # Custom styles
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        spaceAfter=30,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#dc2626')
    )
    
    header_style = ParagraphStyle(
        'CustomHeader',
        parent=styles['Heading2'],
        fontSize=16,
        spaceAfter=12,
        textColor=colors.HexColor('#1f2937')
    )
    
    # Title
    story.append(Paragraph("FIVESTAR DRIVING SCHOOL", title_style))
    story.append(Paragraph("BOOKING CONFIRMATION", styles['Heading2']))
    story.append(Spacer(1, 20))
    
    # Booking Reference
    story.append(Paragraph(f"<b>Booking Reference:</b> {booking_data['reference']}", styles['Normal']))
    story.append(Paragraph(f"<b>Date:</b> {datetime.datetime.now().strftime('%B %d, %Y')}", styles['Normal']))
    story.append(Spacer(1, 20))
    
    # Student Information
    story.append(Paragraph("STUDENT INFORMATION", header_style))
    student_data = [
        ['Name:', booking_data['student_name']],
        ['Phone:', booking_data['phone']],
        ['ID Number:', booking_data['id_number']],
    ]
    
    student_table = Table(student_data, colWidths=[2*inch, 4*inch])
    student_table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 12),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(student_table)
    story.append(Spacer(1, 20))
    
    # Course Details
    story.append(Paragraph("COURSE DETAILS", header_style))
    course_data = [
        ['Course:', booking_data['course']],
        ['Class Type:', booking_data['class_type']],
        ['Branch:', f"{booking_data['branch']} - {booking_data['branch_address']}"],
        ['Scheduled Date:', booking_data['date']],
        ['Time:', booking_data['time']],
        ['Instructor:', booking_data['instructor']],
    ]
    
    course_table = Table(course_data, colWidths=[2*inch, 4*inch])
    course_table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 12),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(course_table)
    story.append(Spacer(1, 20))
    
    # Course Features
    story.append(Paragraph("COURSE FEATURES", header_style))
    features = [
        "✓ 30 Practical Lessons",
        "✓ Unlimited Theory Sessions", 
        "✓ Basic Mechanics Training",
        "✓ FREE Learner's Manual",
        "✓ NTSA Certified Training"
    ]
    
    for feature in features:
        story.append(Paragraph(feature, styles['Normal']))
    story.append(Spacer(1, 20))
    
    # Pricing Information
    story.append(Paragraph("PRICING INFORMATION", header_style))
    story.append(Paragraph("🎉 <b>Our Fee is All Inclusive</b> 🎉", styles['Normal']))
    story.append(Paragraph("Includes a FREE Learner's Manual", styles['Normal']))
    story.append(Spacer(1, 20))
    
    # Operating Hours
    story.append(Paragraph("OPERATING HOURS", header_style))
    hours_data = [
        ['Monday - Friday:', '7:00 AM - 7:00 PM'],
        ['Saturday:', '7:00 AM - 7:00 PM'],
        ['Sunday:', 'Available Upon Request'],
    ]
    
    hours_table = Table(hours_data, colWidths=[2*inch, 4*inch])
    hours_table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 12),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(hours_table)
    story.append(Spacer(1, 20))
    
    # Contact Information
    story.append(Paragraph("CONTACT INFORMATION", header_style))
    contact_data = [
        ['Branch Phone:', booking_data['branch_phone']],
        ['Main Office:', '0794 478 773'],
        ['Email:', 'info@fivestardrivingschool.co.ke'],
        ['Website:', 'www.fivestardrivingschool.co.ke'],
    ]
    
    contact_table = Table(contact_data, colWidths=[2*inch, 4*inch])
    contact_table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 12),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(contact_table)
    story.append(Spacer(1, 30))
    
    # Footer
    footer_style = ParagraphStyle(
        'Footer',
        parent=styles['Normal'],
        fontSize=14,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#dc2626')
    )
    
    story.append(Paragraph("Thank you for choosing FIVESTAR Driving School!", footer_style))
    story.append(Paragraph("Driving Is Fun, Driving Is Freedom.", footer_style))
    
    # Build PDF
    doc.build(story)
    print(f"Booking confirmation PDF generated: {filename}")

# Example usage
if __name__ == "__main__":
    sample_booking = {
        'reference': 'FS123456ABC',
        'student_name': 'John Doe',
        'phone': '0700123456',
        'id_number': '12345678',
        'course': 'B1 Automatic Car License',
        'class_type': 'Private Classes',
        'branch': 'Roysambu',
        'branch_address': 'Kamiti Road',
        'branch_phone': '0794 478 773',
        'date': 'January 15, 2024',
        'time': '10:00 AM',
        'instructor': 'James Mwangi'
    }
    
    generate_booking_confirmation_pdf(sample_booking, 'booking_confirmation.pdf')
