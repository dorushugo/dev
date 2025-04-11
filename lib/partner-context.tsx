"use client";

import { Partner, partners as initialPartners } from "@/lib/data";
import { getFromLocalStorage, saveToLocalStorage } from "@/lib/utils";
import { createContext, useContext, useEffect, useState } from "react";

interface PartnerContextType {
  partners: Partner[];
  addPartner: (partner: Omit<Partner, "id" | "collaborations">) => void;
  updatePartner: (partnerId: string, partner: Partial<Partner>) => void;
  deletePartner: (partnerId: string) => void;
  getPartnerById: (partnerId: string) => Partner | undefined;
  getPartnersByVehicleType: (type: string) => Partner[];
  getPartnersByLocation: (location: string) => Partner[];
}

const PartnerContext = createContext<PartnerContextType | undefined>(undefined);

export const PartnerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    // Charger les partenaires depuis localStorage ou utiliser les données initiales
    const storedPartners = getFromLocalStorage<Partner[]>(
      "partners",
      initialPartners
    );

    // Vérifier que les données des partenaires sont valides
    if (Array.isArray(storedPartners) && storedPartners.length > 0) {
      setPartners(storedPartners);
    } else {
      console.warn(
        "Données partenaires non valides, utilisation des données initiales"
      );
      setPartners(initialPartners);
    }
  }, []);

  // Sauvegarder les partenaires dans localStorage à chaque modification
  useEffect(() => {
    if (partners.length > 0) {
      saveToLocalStorage("partners", partners);
    }
  }, [partners]);

  const addPartner = (partnerData: Omit<Partner, "id" | "collaborations">) => {
    const newPartner: Partner = {
      ...partnerData,
      id: `partner_${Date.now()}`,
      collaborations: 0,
    };

    setPartners((prev) => [...prev, newPartner]);
  };

  const updatePartner = (partnerId: string, partnerData: Partial<Partner>) => {
    setPartners((prev) =>
      prev.map((partner) =>
        partner.id === partnerId ? { ...partner, ...partnerData } : partner
      )
    );
  };

  const deletePartner = (partnerId: string) => {
    setPartners((prev) => prev.filter((partner) => partner.id !== partnerId));
  };

  const getPartnerById = (partnerId: string) => {
    return partners.find((partner) => partner.id === partnerId);
  };

  const getPartnersByVehicleType = (type: string) => {
    return partners.filter((partner) =>
      partner.vehicleTypes.some((vType) =>
        vType.toLowerCase().includes(type.toLowerCase())
      )
    );
  };

  const getPartnersByLocation = (location: string) => {
    return partners.filter(
      (partner) =>
        partner.location.toLowerCase().includes(location.toLowerCase()) ||
        partner.area.some((area) =>
          area.toLowerCase().includes(location.toLowerCase())
        )
    );
  };

  return (
    <PartnerContext.Provider
      value={{
        partners,
        addPartner,
        updatePartner,
        deletePartner,
        getPartnerById,
        getPartnersByVehicleType,
        getPartnersByLocation,
      }}
    >
      {children}
    </PartnerContext.Provider>
  );
};

export const usePartner = () => {
  const context = useContext(PartnerContext);
  if (context === undefined) {
    throw new Error(
      "usePartner doit être utilisé à l'intérieur d'un PartnerProvider"
    );
  }
  return context;
};
