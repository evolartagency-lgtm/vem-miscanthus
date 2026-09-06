import type { LeadType } from "@/lib/leads";
import type { FormConfig } from "@/components/forms/LeadForm";
import type { Dictionary } from "@/data/dictionaries";

type F = Dictionary["forms"];

function fields(t: F) {
  const f = t.fields;
  const o = t.options;
  return {
    contact: [
      { kind: "text", name: "name", label: f.name, required: true },
      { kind: "email", name: "email", label: f.email, required: true },
      { kind: "tel", name: "phone", label: f.phone },
      { kind: "text", name: "company", label: f.company },
      { kind: "text", name: "country", label: f.country },
    ] as FormConfig["fields"],
    area: [
      { kind: "number", name: "landAreaHa", label: f.landAreaHa, min: 0 },
      { kind: "select", name: "plantingSeason", label: f.plantingSeason, options: o.seasons },
    ] as FormConfig["fields"],
    needs: [
      { kind: "checkbox", name: "needLogistics", label: f.needLogistics },
      { kind: "checkbox", name: "needAgronomy", label: f.needAgronomy },
      { kind: "checkbox", name: "needEquipment", label: f.needEquipment },
    ] as FormConfig["fields"],
    product: [
      { kind: "select", name: "requestedProduct", label: f.requestedProduct, options: o.products },
    ] as FormConfig["fields"],
    comment: [
      { kind: "textarea", name: "comment", label: f.comment },
    ] as FormConfig["fields"],
  };
}

export type FormKey =
  | "reserve" | "commercial" | "investment" | "partnership" | "franchise"
  | "government" | "project" | "agronomic" | "equipment" | "carbon"
  | "esg" | "regionalPilot" | "grantConsortium" | "strategic" | "platformInvestment";

const TYPE_BY_KEY: Record<FormKey, LeadType> = {
  reserve: "reserve_rhizomes",
  commercial: "commercial_offer",
  investment: "investment_case",
  partnership: "partnership",
  franchise: "franchise",
  government: "government_program",
  project: "project",
  agronomic: "agronomic_support",
  equipment: "equipment_selection",
  carbon: "carbon_partnership",
  esg: "esg_report",
  regionalPilot: "regional_pilot",
  grantConsortium: "grant_consortium",
  strategic: "strategic_partnership",
  platformInvestment: "platform_investment",
};

export function getFormConfigs(dict: Dictionary): Record<FormKey, FormConfig> {
  const t = dict.forms;
  const c = t.configs;
  const F = fields(t);

  return {
    reserve: { type: TYPE_BY_KEY.reserve, title: c.reserve.title, description: c.reserve.description, submitLabel: c.reserve.submit, successMessage: c.reserve.success, fields: [...F.contact, ...F.area, ...F.product, ...F.needs, ...F.comment] },
    commercial: { type: TYPE_BY_KEY.commercial, title: c.commercial.title, description: c.commercial.description, submitLabel: c.commercial.submit, successMessage: c.commercial.success, fields: [...F.contact, ...F.area, ...F.product, ...F.comment] },
    investment: { type: TYPE_BY_KEY.investment, title: c.investment.title, description: c.investment.description, submitLabel: c.investment.submit, successMessage: c.investment.success, fields: [...F.contact.slice(0, 4), { kind: "select", name: "budget", label: t.fields.budget, options: t.options.tickets }, ...F.comment] },
    partnership: { type: TYPE_BY_KEY.partnership, title: c.partnership.title, description: c.partnership.description, submitLabel: c.partnership.submit, successMessage: c.partnership.success, fields: [...F.contact.slice(0, 2), { kind: "text", name: "company", label: t.fields.organization }, { kind: "text", name: "country", label: t.fields.country }, { kind: "select", name: "requestedProduct", label: t.fields.partnershipArea, options: t.options.partnershipAreas }, ...F.comment] },
    franchise: { type: TYPE_BY_KEY.franchise, title: c.franchise.title, description: c.franchise.description, submitLabel: c.franchise.submit, successMessage: c.franchise.success, fields: [...F.contact.slice(0, 4), { kind: "number", name: "landAreaHa", label: t.fields.projectedArea, min: 0 }, ...F.comment] },
    government: { type: TYPE_BY_KEY.government, title: c.government.title, description: c.government.description, submitLabel: c.government.submit, successMessage: c.government.success, fields: [...F.contact.slice(0, 2), { kind: "text", name: "company", label: t.fields.institution }, { kind: "text", name: "country", label: t.fields.country, required: true }, { kind: "select", name: "requestedProduct", label: t.fields.programArea, options: t.options.programAreas }, ...F.comment] },
    project: { type: TYPE_BY_KEY.project, title: c.project.title, description: c.project.description, submitLabel: c.project.submit, successMessage: c.project.success, fields: [...F.contact, ...F.area.slice(0, 1), ...F.needs, ...F.comment] },
    agronomic: { type: TYPE_BY_KEY.agronomic, title: c.agronomic.title, description: c.agronomic.description, submitLabel: c.agronomic.submit, successMessage: c.agronomic.success, fields: [...F.contact, ...F.area.slice(0, 1), ...F.comment] },
    equipment: { type: TYPE_BY_KEY.equipment, title: c.equipment.title, description: c.equipment.description, submitLabel: c.equipment.submit, successMessage: c.equipment.success, fields: [...F.contact, ...F.area.slice(0, 1), ...F.product, ...F.comment] },
    carbon: { type: TYPE_BY_KEY.carbon, title: c.carbon.title, description: c.carbon.description, submitLabel: c.carbon.submit, successMessage: c.carbon.success, fields: [...F.contact, { kind: "select", name: "budget", label: t.fields.budget, options: t.options.tickets }, ...F.comment] },
    esg: { type: TYPE_BY_KEY.esg, title: c.esg.title, description: c.esg.description, submitLabel: c.esg.submit, successMessage: c.esg.success, fields: [...F.contact, ...F.comment] },
    regionalPilot: { type: TYPE_BY_KEY.regionalPilot, title: c.regionalPilot.title, description: c.regionalPilot.description, submitLabel: c.regionalPilot.submit, successMessage: c.regionalPilot.success, fields: [...F.contact, ...F.area.slice(0, 1), ...F.comment] },
    grantConsortium: { type: TYPE_BY_KEY.grantConsortium, title: c.grantConsortium.title, description: c.grantConsortium.description, submitLabel: c.grantConsortium.submit, successMessage: c.grantConsortium.success, fields: [...F.contact.slice(0, 2), { kind: "text", name: "company", label: t.fields.organization }, { kind: "text", name: "country", label: t.fields.country }, { kind: "select", name: "requestedProduct", label: t.fields.partnershipArea, options: t.options.partnershipAreas }, ...F.comment] },
    strategic: { type: TYPE_BY_KEY.strategic, title: c.strategic.title, description: c.strategic.description, submitLabel: c.strategic.submit, successMessage: c.strategic.success, fields: [...F.contact.slice(0, 2), { kind: "text", name: "company", label: t.fields.organization }, { kind: "text", name: "country", label: t.fields.country }, { kind: "select", name: "requestedProduct", label: t.fields.partnershipArea, options: t.options.partnershipAreas }, ...F.comment] },
    platformInvestment: { type: TYPE_BY_KEY.platformInvestment, title: c.platformInvestment.title, description: c.platformInvestment.description, submitLabel: c.platformInvestment.submit, successMessage: c.platformInvestment.success, fields: [...F.contact.slice(0, 4), { kind: "select", name: "budget", label: t.fields.budget, options: t.options.tickets }, ...F.comment] },
  };
}
