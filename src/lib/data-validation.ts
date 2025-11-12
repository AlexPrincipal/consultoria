export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  title: string;
  bio: string;
  homeSummary: string;
  fullBio: string;
  achievements: string[];
  imageUrl: string;
  imageHint?: string;
  imagePosition?: string;
  linkedinUrl?: string;
  order: number;
}

/**
 * Valida que un objeto TeamMember tenga todas las propiedades requeridas
 */
export function validateTeamMember(data: unknown): data is TeamMember {
  if (!data || typeof data !== 'object') {
    console.error('❌ validateTeamMember: data is not an object');
    return false;
  }

  const candidate = data as Partial<Record<keyof TeamMember, unknown>>;

  const requiredFields: Array<keyof TeamMember> = [
    'id', 'slug', 'name', 'title', 'bio', 
    'homeSummary', 'fullBio', 'achievements', 
    'imageUrl', 'order'
  ];

  for (const field of requiredFields) {
    if (!(field in candidate) || candidate[field] === undefined || candidate[field] === null) {
      console.error(`❌ validateTeamMember: Missing required field: ${field}`);
      return false;
    }
  }

  // Validaciones específicas
  const requiredStringFields: Array<keyof TeamMember> = [
    'id',
    'slug',
    'name',
    'title',
    'bio',
    'homeSummary',
    'fullBio',
    'imageUrl',
  ];

  for (const field of requiredStringFields) {
    const value = candidate[field];
    if (typeof value !== 'string' || value.trim() === '') {
      console.error(`❌ validateTeamMember: ${String(field)} must be a non-empty string`);
      return false;
    }
  }

  const achievementsValue = candidate.achievements;
  if (!Array.isArray(achievementsValue) || achievementsValue.length === 0) {
    console.error('❌ validateTeamMember: achievements must be a non-empty array');
    return false;
  }

  for (const achievement of achievementsValue) {
    if (typeof achievement !== 'string' || achievement.trim() === '') {
      console.error('❌ validateTeamMember: achievements must contain non-empty strings');
      return false;
    }
  }

  const optionalStringFields: Array<keyof TeamMember> = ['imageHint', 'imagePosition', 'linkedinUrl'];
  for (const field of optionalStringFields) {
    const value = candidate[field];
    if (value === undefined) {
      continue;
    }
    if (value === null || typeof value !== 'string' || value.trim() === '') {
      console.error(`❌ validateTeamMember: ${String(field)} must be a non-empty string when provided`);
      return false;
    }
  }

  const orderValue = candidate.order;
  if (typeof orderValue !== 'number' || !Number.isFinite(orderValue)) {
    console.error('❌ validateTeamMember: order must be a finite number');
    return false;
  }

  console.log('✅ validateTeamMember: All validations passed');
  return true;
}

/**
 * Normaliza los datos de un TeamMember, limpiando strings y asegurando tipos correctos
 */
export function normalizeTeamMember(data: unknown): TeamMember | null {
  if (!data || typeof data !== 'object') {
    console.error('❌ normalizeTeamMember: data is not an object');
    return null;
  }

  try {
    const raw = data as Record<string, unknown>;

    const toTrimmedString = (value: unknown): string => {
      return typeof value === 'string' ? value.trim() : '';
    };

    const toOptionalTrimmedString = (value: unknown): string | undefined => {
      if (typeof value !== 'string') {
        return undefined;
      }
      const trimmed = value.trim();
      return trimmed.length > 0 ? trimmed : undefined;
    };

    const toNumber = (value: unknown): number => {
      if (typeof value === 'number') {
        return value;
      }
      if (typeof value === 'string' && value.trim() !== '') {
        return Number(value);
      }
      return Number.NaN;
    };

    const achievements = Array.isArray(raw.achievements)
      ? raw.achievements
          .filter((achievement): achievement is string => typeof achievement === 'string')
          .map((achievement) => achievement.trim())
          .filter((achievement) => achievement.length > 0)
      : [];

    const normalized: TeamMember = {
      id: toTrimmedString(raw.id),
      slug: toTrimmedString(raw.slug),
      name: toTrimmedString(raw.name),
      title: toTrimmedString(raw.title),
      bio: toTrimmedString(raw.bio),
      homeSummary: toTrimmedString(raw.homeSummary),
      fullBio: toTrimmedString(raw.fullBio),
      achievements,
      imageUrl: toTrimmedString(raw.imageUrl),
      imageHint: toOptionalTrimmedString(raw.imageHint),
      imagePosition: toOptionalTrimmedString(raw.imagePosition),
      linkedinUrl: toOptionalTrimmedString(raw.linkedinUrl),
      order: toNumber(raw.order),
    };

    if (!Number.isFinite(normalized.order)) {
      console.error('❌ normalizeTeamMember: order is not a valid number');
      return null;
    }

    if (!validateTeamMember(normalized)) {
      console.error('❌ normalizeTeamMember: Normalized data failed validation');
      return null;
    }

    console.log('✅ normalizeTeamMember: Data normalized successfully');
    return normalized;
  } catch (error) {
    console.error('❌ normalizeTeamMember: Error during normalization:', error);
    return null;
  }
}

/**
 * Valida cualquier objeto de contenido antes de enviarlo a Firestore
 */
export function validateFirestoreData(data: unknown, requiredFields: string[] = []): boolean {
  if (!data || typeof data !== 'object') {
    console.error('❌ validateFirestoreData: data is not an object');
    return false;
  }

  const record = data as Record<string, unknown>;

  // Verificar campos requeridos
  for (const field of requiredFields) {
    if (!(field in record)) {
      console.error(`❌ validateFirestoreData: Missing required field: ${field}`);
      return false;
    }

    const value = record[field];
    if (value === undefined || value === null) {
      console.error(`❌ validateFirestoreData: Missing required field: ${field}`);
      return false;
    }

    if (typeof value === 'string' && value.trim() === '') {
      console.error(`❌ validateFirestoreData: Missing or empty required field: ${field}`);
      return false;
    }
  }

  console.log('✅ validateFirestoreData: All validations passed');
  return true;
}