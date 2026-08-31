(() => {
    "use strict";

    const year = document.querySelector("[data-current-year]");
    if (year) year.textContent = new Date().getFullYear();

    document.querySelectorAll(".navbar .nav-link, .freelance-section a[href^='#']").forEach((link) => {
        link.addEventListener("click", (event) => {
            const target = document.querySelector(link.getAttribute("href"));
            if (!target) return;
            event.preventDefault();
            const scrollToTarget = () => target.scrollIntoView({ behavior: "smooth", block: "start" });
            const mobileMenu = window.jQuery ? window.jQuery("#navbar-content") : null;
            if (mobileMenu?.hasClass("show")) {
                mobileMenu.one("hidden.bs.collapse", scrollToTarget).collapse("hide");
            } else {
                scrollToTarget();
            }
        });
    });

    const filterButtons = [...document.querySelectorAll("[data-filter]")];
    const portfolioEntries = [...document.querySelectorAll(".portfolio-entry")];
    const filterStatus = document.querySelector("[data-filter-status]");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;
            let visibleCount = 0;

            filterButtons.forEach((candidate) => {
                const isActive = candidate === button;
                candidate.classList.toggle("active", isActive);
                candidate.setAttribute("aria-pressed", String(isActive));
            });

            portfolioEntries.forEach((entry) => {
                const categories = entry.dataset.categories.split(" ");
                const isVisible = filter === "all" || categories.includes(filter);
                entry.hidden = !isVisible;
                if (isVisible) visibleCount += 1;
            });

            if (filterStatus) filterStatus.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? "project" : "projects"}.`;
        });
    });

    const caseStudies = {
        video: {
            maturity: "Professional · Production",
            maturityClass: "maturity-production",
            title: "Embedded video recording lifecycle",
            sections: [
                ["Business model", "A recruiting product needs recorded video sessions to move from an external video provider into the application so authorized users can access them within their normal workflow."],
                ["Contribution", "Built the asynchronous backend flow that retrieves recordings through Zoom SDK, processes the lifecycle in the background, stores files in AWS S3, and makes them available in the product."],
                ["Engineering focus", "Provider integration, background processing, object storage, lifecycle states, test scenarios, and operational visibility."],
                ["Maturity", "Professional work implemented as a required capability for an embedded video solution."]
            ]
        },
        loyalty: {
            maturity: "Professional",
            maturityClass: "maturity-professional",
            title: "Loyalty and rewards platform",
            sections: [
                ["Business model", "Customers earn benefits through eligible activity and redeem them against a managed catalog, while operators configure rules, rewards, campaigns, and connected payment or service flows."],
                ["Contribution", "Contributed to backend behavior across the loyalty lifecycle, working with PHP, Laravel, REST APIs, asynchronous processing, relational data, and third-party integrations."],
                ["Engineering focus", "Business rules, transactional consistency, queues, catalog operations, integration boundaries, and maintainable service behavior."],
                ["Maturity", "Professional software-factory experience."]
            ]
        },
        campaign: {
            maturity: "Professional",
            maturityClass: "maturity-professional",
            title: "Campaign and raffle management",
            sections: [
                ["Business model", "Marketing teams configure time-bound campaigns and participation conditions, then manage eligible entries and controlled result publication."],
                ["Contribution", "Worked on backend workflows and business rules for a custom campaign-oriented application in a software-factory setting."],
                ["Engineering focus", "Rule validation, campaign states, persistence, administrative flows, and predictable outcomes."],
                ["Maturity", "Professional project experience."]
            ]
        },
        education: {
            maturity: "Professional",
            maturityClass: "maturity-professional",
            title: "Education and learning platform",
            sections: [
                ["Business model", "Organizations publish learning content and activities while instructors manage cohorts, permissions, assessments, and learner progress."],
                ["Contribution", "Worked on application behavior supporting role-based access, content, activities, and progress-oriented workflows."],
                ["Engineering focus", "Permissions, content lifecycle, assessment flows, relational data, and administrative usability."],
                ["Maturity", "Professional project experience."]
            ]
        },
        tracking: {
            maturity: "Professional",
            maturityClass: "maturity-professional",
            title: "Student progress tracking",
            sections: [
                ["Business model", "Education teams need a consistent record of attendance, results, achievements, and progress that can support follow-up and reporting."],
                ["Contribution", "Contributed to backend and integration flows for collecting learning records and exposing information to operational users or connected systems."],
                ["Engineering focus", "Relational modeling, REST APIs, permissions, reporting inputs, and maintainable workflows."],
                ["Maturity", "Professional project experience."]
            ]
        },
        operations: {
            maturity: "Professional",
            maturityClass: "maturity-professional",
            title: "Business operations back office",
            sections: [
                ["Business model", "Internal teams use one administrative surface to manage day-to-day processes, records, permissions, and operational reporting."],
                ["Contribution", "Worked mainly on backend behavior and also delivered selected Laravel views and interface changes in collaboration with UX/UI."],
                ["Engineering focus", "Permissions, data integrity, administrative workflows, reporting support, and third-party integrations."],
                ["Maturity", "Professional software-factory experience."]
            ]
        },
        intranet: {
            maturity: "Professional",
            maturityClass: "maturity-professional",
            title: "Internal collaboration platform",
            sections: [
                ["Business model", "An internal platform centralizes employee information, shared documents, tasks, and operational communication."],
                ["Contribution", "Contributed to custom application workflows and the backend behavior required to organize access and internal activity."],
                ["Engineering focus", "Role-based access, information organization, internal workflows, and maintainable administrative features."],
                ["Maturity", "Professional project experience."]
            ]
        },
        scraping: {
            maturity: "POC / prototype",
            maturityClass: "maturity-poc",
            title: "Automated data extraction",
            sections: [
                ["Business model", "A repeatable extraction workflow can turn public web information into normalized data for later review or downstream processing."],
                ["Contribution", "Explored Python-based scraping, background execution, cleaning steps, and API delivery patterns."],
                ["Engineering focus", "Automation boundaries, extraction resilience, structured output, and separation between collection and consumption."],
                ["Maturity", "Applied prototype; production usage, scale, and operating constraints are not claimed."]
            ]
        },
        document: {
            maturity: "POC / prototype",
            maturityClass: "maturity-poc",
            title: "Document automation",
            sections: [
                ["Business model", "Operational teams receive documents that must be processed into structured information before a person can validate or continue the workflow."],
                ["Contribution", "Built and explored prototypes using Python, FastAPI or Flask, OCR and PDF processing, background tasks, callbacks, and AI-assisted extraction."],
                ["Engineering focus", "Document lifecycle, asynchronous processing, extraction boundaries, dependency injection, and human verification."],
                ["Maturity", "Prototype evidence only; production usage, accuracy, scale, and impact are not claimed."]
            ]
        },
        recruitment: {
            maturity: "POC / prototype",
            maturityClass: "maturity-poc",
            title: "Recruitment workflow assistance",
            sections: [
                ["Business model", "Recruiting teams can use assisted analysis to organize candidate information and reduce repetitive workflow steps while keeping people responsible for decisions."],
                ["Contribution", "Explored OpenAI-assisted candidate analysis and workflow support as an applied project."],
                ["Engineering focus", "Structured inputs, integration boundaries, explainable outputs, workflow fit, and human-in-the-loop review."],
                ["Maturity", "Prototype only; automated hiring decisions and production-scale results are not claimed."]
            ]
        }
    };

    const dialog = document.querySelector("[data-project-dialog]");
    const dialogTitle = dialog?.querySelector("[data-dialog-title]");
    const dialogMaturity = dialog?.querySelector("[data-dialog-maturity]");
    const dialogContent = dialog?.querySelector("[data-dialog-content]");
    let dialogTrigger = null;

    document.querySelectorAll("[data-project]").forEach((button) => {
        button.addEventListener("click", () => {
            const project = caseStudies[button.dataset.project];
            if (!project || !dialog || !dialogTitle || !dialogMaturity || !dialogContent) return;
            dialogTrigger = button;
            dialogTitle.textContent = project.title;
            dialogMaturity.textContent = project.maturity;
            dialogMaturity.className = `maturity ${project.maturityClass}`;
            dialogContent.replaceChildren();
            project.sections.forEach(([heading, copy]) => {
                const section = document.createElement("section");
                const title = document.createElement("h3");
                const paragraph = document.createElement("p");
                title.textContent = heading;
                paragraph.textContent = copy;
                section.append(title, paragraph);
                dialogContent.append(section);
            });
            dialog.showModal();
        });
    });

    const closeDialog = () => {
        dialog?.close();
        dialogTrigger?.focus();
    };
    dialog?.querySelector("[data-dialog-close]")?.addEventListener("click", closeDialog);
    dialog?.addEventListener("click", (event) => {
        if (event.target === dialog) closeDialog();
    });

    const form = document.querySelector("[data-contact-form]");
    if (!form) return;

    const fields = [...form.querySelectorAll("input:not([type='hidden']), textarea")].filter((field) => field.name !== "_gotcha");
    const messageField = form.elements.message;
    const characterCount = form.querySelector("[data-character-count]");
    const status = form.querySelector("[data-form-status]");
    const submitButton = form.querySelector("[data-submit-button]");
    const submitLabel = form.querySelector("[data-submit-label]");
    form.noValidate = true;

    const validationMessage = (field) => {
        const value = field.value.trim();
        if (field.required && !value) return `${field.labels[0]?.textContent || "This field"} is required.`;
        if (field.type === "email" && field.validity.typeMismatch) return "Enter a valid email address.";
        if (field.minLength > 0 && value.length < field.minLength) return `Use at least ${field.minLength} characters.`;
        if (field.maxLength > 0 && value.length > field.maxLength) return `Use no more than ${field.maxLength} characters.`;
        return "";
    };

    const showFieldError = (field, message) => {
        const error = form.querySelector(`[data-error-for="${field.name}"]`);
        field.setAttribute("aria-invalid", message ? "true" : "false");
        if (error) error.textContent = message;
    };
    const validateField = (field) => {
        const message = validationMessage(field);
        showFieldError(field, message);
        return !message;
    };
    const setStatus = (message, type = "") => {
        if (!status) return;
        status.textContent = message;
        status.className = `form-status${type ? ` is-${type}` : ""}`;
    };
    const setSubmitting = (isSubmitting) => {
        if (submitButton) submitButton.disabled = isSubmitting;
        if (submitLabel) submitLabel.textContent = isSubmitting ? "Sending…" : "Send Message";
    };
    const updateCharacterCount = () => {
        if (characterCount && messageField) characterCount.textContent = `${messageField.value.length} / 3000`;
    };

    updateCharacterCount();
    messageField?.addEventListener("input", updateCharacterCount);
    fields.forEach((field) => {
        field.addEventListener("blur", () => validateField(field));
        field.addEventListener("input", () => {
            if (field.getAttribute("aria-invalid") === "true") validateField(field);
        });
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        setStatus("");
        const isValid = fields.map(validateField).every(Boolean);
        if (!isValid) {
            fields.find((field) => field.getAttribute("aria-invalid") === "true")?.focus();
            setStatus("Review the highlighted fields and try again.", "error");
            return;
        }
        if (form.action.endsWith("/FORM_ID")) {
            setStatus("The contact endpoint is not configured yet. Please use the email link instead.", "error");
            return;
        }

        setSubmitting(true);
        try {
            const response = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
            if (response.ok) {
                form.reset();
                fields.forEach((field) => showFieldError(field, ""));
                updateCharacterCount();
                setStatus("Thanks—your message was sent. I will reply by email.", "success");
                return;
            }
            if (response.status === 429) {
                setStatus("Too many messages were sent recently. Please wait a moment and try again.", "error");
                return;
            }
            const payload = await response.json().catch(() => null);
            (payload?.errors || []).forEach((error) => {
                const field = fields.find((candidate) => candidate.name === error.field);
                if (field) showFieldError(field, error.message || "Check this field.");
            });
            setStatus("The message could not be sent. Check the form or email me directly.", "error");
        } catch {
            setStatus("A network error prevented sending. Please try again or use the email link.", "error");
        } finally {
            setSubmitting(false);
        }
    });
})();
