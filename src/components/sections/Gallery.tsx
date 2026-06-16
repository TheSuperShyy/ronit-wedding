import Section from '../layout/Section';
import { PhotoGallery } from '../ui/gallery';

/** Photo gallery — draggable stacked-photo collection (our images + copy). */
export default function Gallery() {
  return (
    <Section bg="bg-ivory" className="relative overflow-hidden cv-auto">
      <PhotoGallery />
    </Section>
  );
}
