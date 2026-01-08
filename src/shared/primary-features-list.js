import DataIcon from '@/components/icons/DataIcon'
import NetworkIcon from '@/components/icons/NetworkIcon'
import PaperIcon from '@/components/icons/PaperIcon'
import ImportScreen from '@/components/screens/ImportScreen'
import NetworkScreen from '@/components/screens/NetworkScreen'
import ExportScreen from '@/components/screens/ExportScreen'

export const features = [
  {
    name: 'Create interactive networks from your data',
    description: 'Generate interactive visualizations...',
    icon: DataIcon,
    screen: ImportScreen,
  },
  {
    name: 'Analyze the results',
    description: 'Analyze the networks by customizing...',
    icon: NetworkIcon,
    screen: NetworkScreen,
  },
  {
    name: 'Export figures for publication',
    description: 'Prepare visualizations and summary reports...',
    icon: PaperIcon,
    screen: ExportScreen,
  },
]
export default features