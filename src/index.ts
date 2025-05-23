//aggregation-quantifiers
import { addAggregateLinq } from './methods/aggregation-quantifiers/aggregateLinq';
import { addAllLinq } from './methods/aggregation-quantifiers/allLinq';
import { addAnyLinq } from './methods/aggregation-quantifiers/anyLinq';
import { addAverageLinq } from './methods/aggregation-quantifiers/averageLinq';
import { addContainsLinq } from './methods/aggregation-quantifiers/containsLinq';
import { addCountLinq } from './methods/aggregation-quantifiers/countLinq';
import { addMaxLinq } from './methods/aggregation-quantifiers/maxLinq';
import { addMinLinq } from './methods/aggregation-quantifiers/minLinq';
import { addSumLinq } from './methods/aggregation-quantifiers/sumLinq';

//combination
import { addConcatLinq } from './methods/combination/concatLinq';
import { addZipLinq } from './methods/combination/zipLinq';

//element-retrieval
import { addElementAtLinq } from './methods/element-retrieval/elementAtLinq';
import { addElementAtOrDefaultLinq } from './methods/element-retrieval/elementAtOrDefaultLinq';
import { addFirstLinq } from './methods/element-retrieval/firstLinq';
import { addFirstOrDefaultLinq } from './methods/element-retrieval/firstOrDefaultLinq';
import { addLastLinq } from './methods/element-retrieval/lastLinq';
import { addLastOrDefaultLinq } from './methods/element-retrieval/lastOrDefaultLinq';
import { addSingleLinq } from './methods/element-retrieval/singleLinq';
import { addSingleOrDefaultLinq } from './methods/element-retrieval/singleOrDefaultLinq';

//filtering
import { addDistinctByLinq } from './methods/filtering/distinctByLinq';
import { addDistinctLinq } from './methods/filtering/distinctLinq';
import { addWhereLinq } from './methods/filtering/whereLinq';

//grouping
import { addGroupByLinq } from './methods/grouping/groupByLinq';

//joins
import { addJoinLinq } from './methods/joins/joinLinq';

//other-utilities
import { addAppendLinq } from './methods/other-utilities/appendLinq';
import { addDefaultIfEmptyLinq } from './methods/other-utilities/defaultIfEmptyLinq';
import { addEmptyLinq } from './methods/other-utilities/emptyLinq';
import { addPrependLinq } from './methods/other-utilities/prependLinq';
import { addRangeLinq } from './methods/other-utilities/rangeLinq';
import { addRepeatLinq } from './methods/other-utilities/repeatLinq';
import { addReverseLinq } from './methods/other-utilities/reverseLinq';
import { addSequenceEqualLinq } from './methods/other-utilities/sequenceEqualLinq';

//partitioning
import { addChuckLinq} from './methods/partitioning/chuckLinq';
import { addSkipLinq } from './methods/partitioning/skipLinq';
import { addSkipWhileLinq } from './methods/partitioning/skipWhileLinq';
import { addTakeLinq } from './methods/partitioning/takeLinq';
import { addTakeWhileLinq } from './methods/partitioning/takeWhileLinq';

//projection
import { addSelectLinq } from './methods/projection/selectLinq';
import { addSelectManyLinq } from './methods/projection/selectManyLinq';

//set-operations
import { addExceptLinq } from './methods/set-operations/exceptLinq';
import { addIntersectLinq } from './methods/set-operations/intersectLinq';
import { addUnionLinq } from './methods/set-operations/unionLinq';


//sorting
import { addOrderByLinq } from './methods/sorting/orderByLinq';
import { addOrderByDescendingLinq } from './methods/sorting/orderByDescendingLinq';
import { addThenByLinq } from './methods/sorting/thenByLinq';
import { addThenByDescendingLinq } from './methods/sorting/thenByDescendingLinq';


//aggregation-quantifiers
addAggregateLinq();
addAllLinq();
addAnyLinq();
addAverageLinq();
addContainsLinq();
addCountLinq();
addMaxLinq();
addMinLinq();
addSumLinq();

//combination
addConcatLinq();
addZipLinq();

//element-retrieval
addElementAtLinq();
addElementAtOrDefaultLinq();
addFirstLinq();
addFirstOrDefaultLinq();
addLastLinq();
addLastOrDefaultLinq();
addSingleLinq();
addSingleOrDefaultLinq();

//filtering
addDistinctByLinq();
addDistinctLinq();
addWhereLinq();

//grouping
addGroupByLinq();

//joins
addJoinLinq();

//other-utilities
addAppendLinq();
addDefaultIfEmptyLinq();
addEmptyLinq();
addPrependLinq();
addRangeLinq();
addRepeatLinq();
addReverseLinq();
addSequenceEqualLinq();

//partitioning
addChuckLinq();
addSkipLinq();
addSkipWhileLinq();
addTakeLinq();
addTakeWhileLinq();

//projection
addSelectLinq();
addSelectManyLinq();

//set-operations
addExceptLinq();
addIntersectLinq();
addUnionLinq();

//sorting
addOrderByLinq();
addOrderByDescendingLinq();
addThenByLinq();
addThenByDescendingLinq();
