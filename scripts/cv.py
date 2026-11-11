#!/usr/bin/env python3
"""Builds assets/Emin-Erkan-Yildirim-CV.pdf (needs pycairo + PyGObject/Pango).

This file and its output are public: keep the phone number out of both.
Usage: python3 scripts/cv.py [output.pdf]
"""
import sys
from pathlib import Path

import cairo
import gi

gi.require_version("Pango", "1.0")
gi.require_version("PangoCairo", "1.0")
from gi.repository import Pango, PangoCairo  # noqa: E402

FONT, SIZE = "Noto Sans", 9.6
PAGE_W, PAGE_H, MX, MY = 595.28, 841.89, 40, 30  # A4, points
LINK = "#0B57D0"
FONT_OPTS = cairo.FontOptions()
FONT_OPTS.set_hint_metrics(cairo.HINT_METRICS_OFF)  # unhinted advances: even letter spacing in print
FONT_OPTS.set_hint_style(cairo.HINT_STYLE_NONE)

CONTACT = [
    ("Manisa, Türkiye", None),
    ("github.com/Robottur", "https://github.com/Robottur"),
    ("eminerkanyildirim.github.io", "https://eminerkanyildirim.github.io/"),
    ("eminerkanyildirim@hotmail.com", "mailto:eminerkanyildirim@hotmail.com"),
]

# ("h", title) | ("row", pango markup, right text) | ("li", text) | ("p", markup) | ("gap", pt)
BODY = [
    ("h", "Education"),
    ("row", "<b>Dokuz Eylul University</b> – MS in Electrical and Electronics Engineering", "February 2025 – Present"),
    ("row", "<b>Dokuz Eylul University</b> – BS in Electrical and Electronics Engineering (GPA: 3.0/4.0)", "September 2019 – June 2024"),
    ("h", "Experience"),
    ("row", "<b>Laboratory Specialist R&amp;D,</b> Vestel Beyaz Eşya – Manisa, Türkiye", "October 2024 – Present"),
    ("li", "Verify tumble-dryer electronic control boards and investigate faults using error logs, oscilloscopes, and multimeters."),
    ("li", "Track and coordinate prototype builds and board bring-up, and support board-level test and verification."),
    ("li", "Work with software and firmware teams on hardware–firmware integration."),
    ("li", "Write test procedures based on applicable IEC 60335 requirements, prepare engineering requirements specifications and hardware-development documentation, and report test results."),
    ("li", "Benchmark competitor products and coordinate with suppliers to evaluate alternative components for technical suitability, cost, quality, and availability."),
    ("gap", 4),
    ("row", "<b>Embedded Software Engineering Intern,</b> Baykar Technologies – İstanbul, Türkiye", "July 2023 – August 2023"),
    ("li", "Studied Data Distribution Service (DDS), compared it with alternative communication protocols, and presented the technical findings."),
    ("li", "Developed a basic Python application to simulate DDS communication."),
    ("gap", 4),
    ("row", "<b>Research and Development Intern,</b> Güleryüz Karoser Otomotiv A.Ş. – Bursa, Türkiye", "July 2022 – August 2022"),
    ("li", "Reviewed CAN bus routing in an electric-bus electrical-system model and determined required cable lengths."),
    ("li", "Standardized signal names in the model to support production-line installation."),
    ("h", "Selected Engineering Projects"),
    ("row", "<b>M.Sc. Thesis: RISC-V Affine-Arithmetic Processing Unit on FPGA</b>", "In progress"),
    ("li", "Designing an FPGA hardware unit, driven by a RISC-V core through custom instructions, to speed up uncertainty and tolerance analysis of engineering systems."),
    ("gap", 4),
    ("row", "<b>Smart Sportswear: BLE ECG &amp; Motion Sensor (TÜBİTAK 1001)</b>", "2023"),
    ("li", "Designed and revised a compact KiCad PCB for a garment-integrated ECG and motion-sensing system using conductive-yarn electrodes."),
    ("li", "Identified an ECG interface voltage-level mismatch during board bring-up, reworked the prototype, and incorporated the correction into a PCB revision."),
    ("li", "Developed RSL10 application firmware in C for ECG sampling, MPU-6050 accelerometer acquisition over I2C, and data transmission using BLE GATT notifications."),
    ("li", "Developed a C tool for decoding BLE logs into CSV files and MATLAB scripts for ECG peak detection and heart-rate estimation."),
    ("gap", 4),
    ("row", "<b>Solar-Car Telemetry, CAN Communication &amp; Data Logging (Solar Team Solaris)</b>", "2022"),
    ("li", "Developed CAN communication software in C on an STM32 microcontroller and built circuitry for communication testing and validation."),
    ("li", "Analyzed LoRa telemetry frames using HTerm and developed a C# application to receive packets through a USB-connected LoRa module and parse their contents into categorized data."),
    ("li", "Implemented packet-checksum validation, live visualization with LiveCharts, and CSV logging; operated it during an actual race for over one hour without observed crashes or freezes."),
    ("h", "Skills"),
    ("p", "<b>Programming Languages:</b> C, C#, Python, SystemVerilog, MATLAB"),
    ("p", "<b>Tools:</b> KiCad, LTspice, QUCS, Proteus, Webots"),
    ("p", "<b>Communication Protocols:</b> TCP/IP, UDP, SPI, UART, CAN, I2C, BLE, MIL-STD-1553"),
    ("p", "<b>Languages:</b> English (Professional working proficiency), Turkish (Native)"),
]


def build(out):
    surface = cairo.PDFSurface(str(out), PAGE_W, PAGE_H)
    surface.set_metadata(cairo.PDF_METADATA_TITLE, "Emin Erkan YILDIRIM — CV")
    surface.set_metadata(cairo.PDF_METADATA_AUTHOR, "Emin Erkan YILDIRIM")
    surface.set_metadata(cairo.PDF_METADATA_CREATE_DATE, "2026-11-11T00:00:00Z")  # fixed: no local timezone
    ctx = cairo.Context(surface)
    width = PAGE_W - 2 * MX

    def text(markup, x, y, size=SIZE, wrap=None, align=None):
        lay = PangoCairo.create_layout(ctx)
        PangoCairo.context_set_resolution(lay.get_context(), 72)  # font sizes in real points
        PangoCairo.context_set_font_options(lay.get_context(), FONT_OPTS)
        lay.set_font_description(Pango.FontDescription(f"{FONT} {size}"))
        lay.set_line_spacing(1.22)
        if wrap:
            lay.set_width(int(wrap * Pango.SCALE))
        if align:
            lay.set_alignment(align)
        lay.set_markup(markup, -1)
        w, h = (v / Pango.SCALE for v in lay.get_size())
        if y is not None:
            ctx.move_to(x, y)
            PangoCairo.show_layout(ctx, lay)
        return w, h

    y = MY
    _, h = text("Emin Erkan YILDIRIM", MX, y, 21, width, Pango.Alignment.CENTER)
    y += h + 1

    sep = "  |  "
    total = sum(text(t, 0, None)[0] for t, _ in CONTACT) + text(sep, 0, None)[0] * (len(CONTACT) - 1)
    x = MX + (width - total) / 2
    for i, (label, href) in enumerate(CONTACT):
        if i:
            x += text(sep, x, y)[0]
        if href:
            ctx.tag_begin(cairo.TAG_LINK, f"uri='{href}'")
            w, h = text(f'<span foreground="{LINK}" underline="single">{label}</span>', x, y)
            ctx.tag_end(cairo.TAG_LINK)
        else:
            w, h = text(label, x, y)
        x += w
    y += h + 2

    for kind, *a in BODY:
        if kind == "gap":
            y += a[0]
        elif kind == "h":
            y += 6
            _, h = text(a[0], MX, y, 11)
            y += h + 1
            ctx.set_line_width(0.7)
            ctx.move_to(MX, y)
            ctx.line_to(MX + width, y)
            ctx.stroke()
            y += 2
        elif kind == "row":
            rw, _ = text(a[1], 0, None)
            text(a[1], MX + width - rw, y)
            _, h = text(a[0], MX, y, wrap=width - rw - 10)
            y += h
        elif kind == "li":
            text("•", MX + 3, y)
            _, h = text(a[0].replace("&", "&amp;"), MX + 13, y, wrap=width - 13)
            y += h
        else:
            _, h = text(a[0], MX, y, wrap=width)
            y += h

    surface.finish()
    if y > PAGE_H - MY:
        sys.exit(f"CV overflows one page by {y - (PAGE_H - MY):.0f}pt; shorten it or lower SIZE")


if __name__ == "__main__":
    default = Path(__file__).resolve().parent.parent / "assets" / "Emin-Erkan-Yildirim-CV.pdf"
    build(sys.argv[1] if len(sys.argv) > 1 else default)
