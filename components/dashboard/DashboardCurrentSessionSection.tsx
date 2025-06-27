import ActiveBotsPanel from './ActiveBotsPanel';
import { DashboardSection } from './DashboardLayout';

interface DashboardCurrentSessionSectionProps {
  currentConversation: any;
  handleFlushMemory: () => void;
}

const DashboardCurrentSessionSection: React.FC<DashboardCurrentSessionSectionProps> = ({
  currentConversation,
  handleFlushMemory,
}) => {
  return (
    <DashboardSection title="Current Session" delay={0.2} className="activeBots">
      <ActiveBotsPanel
        currentConversation={currentConversation}
        onStartNewChat={handleFlushMemory}
      />
    </DashboardSection>
  );
};

export default DashboardCurrentSessionSection;
