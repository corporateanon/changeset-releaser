import { CommandModule } from 'yargs';
import { getMonorepoData } from '../core';
import { ExecutionPlanner, TargetGroup } from '../ExecutionPlanner';
import { PlanExecutor } from '../PlanExecutor';
import { ScriptRunnerYarn } from '../ScriptRunner';

interface Args {}

const BuildCommand: CommandModule<{}, Args> = {
  command: 'build',
  builder: {},
  describe:
    'Build changed packages, packages for test and all their dependencies',
  async handler() {
    const monorepo = await getMonorepoData(process.cwd());
    const executor = new PlanExecutor(
      new ExecutionPlanner(monorepo),
      new ScriptRunnerYarn()
    );
    await executor.runScript(TargetGroup.Build, 'build');
  }
};
export default BuildCommand;
