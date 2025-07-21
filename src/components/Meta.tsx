import { Helmet } from "react-helmet-async";
import React from "react";

interface MetaProps {
  title?: string;
  description?: string;
}

const Meta: React.FC<MetaProps> = ({ title, description }) => (
  <Helmet>
    {title && <title>{title}</title>}
    {description && <meta name="description" content={description} />}
  </Helmet>
);

export default Meta; 