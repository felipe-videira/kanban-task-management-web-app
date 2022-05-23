import i18next from "i18next";
import { any, func, InferProps, objectOf } from "prop-types";
import { useMemo } from "react";
import { deepFind } from "../utils/deepPath";

export default function DynamicTranslation({
  values,
  children,
}: InferProps<typeof DynamicTranslation.propTypes>) {
  const resources = useMemo(() => {
    if (!i18next.resolvedLanguage) return {};
    return (
      values[i18next.resolvedLanguage] ||
      values[(i18next.resolvedLanguage.split("-") || [])[0]] ||
      {}
    );
  }, [values]);

  function dt(key: string) {
    return deepFind(resources, key) || key;
  }

  return children({ dt });
}

DynamicTranslation.propTypes = {
  values: objectOf(any).isRequired,
  children: func.isRequired,
};
