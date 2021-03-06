// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library Clone {
    function cloneDeterministic(address master, bytes32 salt) internal returns (address instance) {
        assembly {
            let ptr := mload(0x40)
            mstore(ptr, 0x3d602d80600a3d3981f3363d3d373d3d3d363d73000000000000000000000000)
            mstore(add(ptr, 0x14), shl(0x60, master))
            mstore(add(ptr, 0x28), 0x5af43d82803e903d91602b57fd5bf30000000000000000000000000000000000)
            instance := create2(0, ptr, 0x37, salt)
        }
        require(instance != address(0), "ERC1167: create2 failed");
    }
}

interface IScore {
    function teacher() external view returns (address);
    function scores(address student) external view returns (uint8);
    function initialize() external;
    function updateScore(address student, uint8 score) external returns (bool);
}

contract Score {
    address public teacher;
    mapping(address => uint8) public scores;

    event ScoreChanged(address indexed student, uint8 score);

    modifier onlyTeacher() {
        require(msg.sender == teacher, "only teacher can call this function!");
        _;
    }

    function initialize() external {
        require(teacher == address(0), "already initialized");
        teacher = msg.sender;
    }

    function updateScore(address student, uint8 score) external onlyTeacher returns (bool) {
        require(score <= 100, "score limit 0 to 100");
        scores[student] = score;
        emit ScoreChanged(student, score);
        return true;
    }
}

contract Teacher {
    using Clone for address;
    address private owner;
    mapping(uint256 => address) private exams;
    uint256 private examCount;
    address private orginScore;

    event ExamCreated(uint256 indexed index);

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner can call this function!");
        _;
    }

    function initialize(address _owner) external {
        require(owner == address(0), "already initialized");
        owner = _owner;
    }

    function newExam() external onlyOwner returns (uint256 index) {
        index = examCount;
        exams[index] = newScore();
        IScore(exams[index]).initialize();
        emit ExamCreated(index);
        return index;
    }

    function setScore(uint256 examIndex, address student, uint8 _score) external onlyOwner returns (bool) {
        require(exams[examIndex] != address(0), "exam non-existent");
        return IScore(exams[examIndex]).updateScore(student, _score);
    }

    function getScore(uint256 examIndex, address student) external view returns (uint8) {
        require(exams[examIndex] != address(0), "exam non-existent");
        return IScore(exams[examIndex]).scores(student);
    }

    function haveExam(uint256 examIndex) external view returns (bool) {
        return exams[examIndex] != address(0);
    }

    function getTeacher(uint256 examIndex) external view returns (address) {
        require(exams[examIndex] != address(0), "exam non-existent");
        return IScore(exams[examIndex]).teacher();
    }

    function getExamCount() external view returns (uint256) {
        return examCount;
    }

    function newScore() internal returns (address) {
        if (address(0) == orginScore) {
            orginScore = newScoreContract();
            return orginScore;
        }
        return orginScore.cloneDeterministic(keccak256(abi.encodePacked(examCount++)));
    }

    function newScoreContract() internal returns (address) {
        ++examCount;
        return address(new Score());
    }
}

interface ITeacher {
    function initialize(address _owner) external;
}

contract TeacherFactory {
    using Clone for address;

    address public owner;
    uint256 public clonedCount;
    address public orignTeacher;

    event TeacherCreated(address teacher);

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner can call this function!");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }

    function newTeacher(address _owder) external onlyOwner returns (address result){
        if (address(0) == orignTeacher) {
            orignTeacher = address(new Teacher());
            result = orignTeacher;
        } else {
            result = orignTeacher.cloneDeterministic(keccak256(abi.encode(clonedCount++)));
        }
        emit TeacherCreated(result);
        ITeacher(result).initialize(_owder);
    }
}