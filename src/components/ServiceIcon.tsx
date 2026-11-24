import {
  Cloud,
  Code2,
  CreditCard,
  Database,
  FileUp,
  Film,
  Gamepad2,
  Globe,
  GraduationCap,
  Image as ImageIcon,
  LayoutGrid,
  Mail,
  Music,
  PenLine,
  Search,
  Sparkles,
  Store,
  Webhook,
} from 'lucide-react';
import type { VzService } from '../data/services';

interface ServiceIconProps {
  name: VzService['iconName'];
  className?: string;
}

export function ServiceIcon({ name, className = 'w-5 h-5' }: ServiceIconProps) {
  switch (name) {
    case 'search':
      return <Search className={className} />;
    case 'layout-grid':
      return <LayoutGrid className={className} />;
    case 'globe':
      return <Globe className={className} />;
    case 'pen-line':
      return <PenLine className={className} />;
    case 'file-up':
      return <FileUp className={className} />;
    case 'store':
      return <Store className={className} />;
    case 'gamepad-2':
      return <Gamepad2 className={className} />;
    case 'code-2':
      return <Code2 className={className} />;
    case 'cloud':
      return <Cloud className={className} />;
    case 'webhook':
      return <Webhook className={className} />;
    case 'sparkles':
      return <Sparkles className={className} />;
    case 'mail':
      return <Mail className={className} />;
    case 'film':
      return <Film className={className} />;
    case 'music':
      return <Music className={className} />;
    case 'image':
      return <ImageIcon className={className} />;
    case 'credit-card':
      return <CreditCard className={className} />;
    case 'graduation-cap':
      return <GraduationCap className={className} />;
    case 'database':
      return <Database className={className} />;
  }
}
